from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.models import Group
from django.contrib.auth import login, logout, authenticate
from users.forms import CustomRegistrationForm, LoginForm, AssignRoleForm, CreateGroupForm
from django.contrib import messages
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.decorators import login_required, user_passes_test
from django.db.models import Prefetch
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.contrib.auth.views import LoginView, PasswordChangeView
from django.views.generic import UpdateView, TemplateView, CreateView
from users.forms import EditProfileFrom, ChangePasswordForm

from django.contrib.auth import get_user_model


User = get_user_model()

def is_admin(user):
    return user.is_authenticated and (user.groups.filter(name='Admin').exists() or user.is_superuser)


#SIGN UP
def sign_up(request):
    form = CustomRegistrationForm()
    if request.method == 'POST':
        form = CustomRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()  # saves with is_active=False
            messages.success(request, 'Registration successful! Please check your email to activate your account.')
            return redirect('sign-in')
        # if invalid
    return render(request, 'sign-in_sign-up.html', {"form": form, "show_signup": True})

class SignUpView(CreateView):
    model = User
    form_class = CustomRegistrationForm
    template_name = 'sign-in_sign-up.html'
    success_url = reverse_lazy('sign-in')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['show_signup'] = True
        return context

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, 'Registration successful! Please check your email to activate your account.')
        return response


#SIGN IN
def sign_in(request):
    form = LoginForm()
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password.")
    return render(request, 'sign-in_sign-up.html', {'form': form, 'show_signup': False})

class SignInView(LoginView):
    form_class = LoginForm
    template_name = 'sign-in_sign-up.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['show_signup'] = False
        context['next'] = self.request.GET.get('next', '')
        return context

    def get_success_url(self):
        next_url = self.request.GET.get('next') or self.request.POST.get('next')
        return next_url if next_url else reverse_lazy('home')

    def form_invalid(self, form):
        messages.error(self.request, "Invalid username or password.")
        return super().form_invalid(form)


#SIGN OUT
@login_required
def sign_out(request):
    logout(request)
    return redirect('home')

#EDIT PROFILE
@method_decorator(login_required, name='dispatch')
class EditProfileView(UpdateView):
    model = User
    form_class = EditProfileFrom
    template_name = 'accounts/update.html'
    success_url = reverse_lazy('profile')
    
    
    def get_object(self):
        return self.request.user

    def form_valid(self, form):
        messages.success(self.request, "Profile updated successfully!")
        return super().form_valid(form)
    
# PROFILE VIEW
class ProfileView(TemplateView):
    template_name = 'accounts/profile.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        user = self.request.user
        
        context['name'] = user.get_full_name()
        context['email'] = user.email
        context['username'] = user.username
        context['bio'] = user.bio
        context['profile_image'] = user.profile_image
        context['phone_number'] = user.phone_number
        
        
        context['member_since'] = user.date_joined
        context['last_login'] = user.last_login
        
        return context
    
# CHANGE PASSWORD
class ChangePassword(PasswordChangeView):
    template_name = 'accounts/change_password.html'
    form_class = ChangePasswordForm



#ACTIVATE USER 
def activate_user(request, user_id, token):
    try:
        user = User.objects.get(id=user_id)
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            messages.success(request, "Your account has been activated! Please log in.")
            return redirect('sign-in')
        else:
            return HttpResponse('<h2>Invalid or expired activation link.</h2>')
    except User.DoesNotExist:
        return HttpResponse('<h2>User not found.</h2>')


#USER LIST (Admin only)
@user_passes_test(is_admin, login_url='no-permission')
def user_list(request):
    users = User.objects.prefetch_related(
        Prefetch('groups', queryset=Group.objects.all(), to_attr='all_groups')
    ).all().order_by('username')

    for u in users:
        if u.all_groups:
            u.group_name = u.all_groups[0].name
        else:
            u.group_name = 'No Role Assigned'

    return render(request, 'admin/user_list.html', {'users': users})


#ASSIGN ROLE (Admin only)
@user_passes_test(is_admin, login_url='no-permission')
def assign_role(request, user_id):
    target_user = get_object_or_404_user(user_id)
    form = AssignRoleForm()

    if request.method == 'POST':
        form = AssignRoleForm(request.POST)
        if form.is_valid():
            role = form.cleaned_data.get('role')
            target_user.groups.clear()
            target_user.groups.add(role)
            messages.success(request, f"User '{target_user.username}' has been assigned to '{role.name}' role.")
            return redirect('user-list')

    return render(request, 'admin/assign_role.html', {'form': form, 'target_user': target_user})


def get_object_or_404_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        from django.http import Http404
        raise Http404("User not found")


#CREATE GROUP (Admin can do)
@user_passes_test(is_admin, login_url='no-permission')
def create_group(request):
    form = CreateGroupForm()
    if request.method == 'POST':
        form = CreateGroupForm(request.POST)
        if form.is_valid():
            group = form.save()
            messages.success(request, f"Group '{group.name}' created successfully!")
            return redirect('group-list')
    return render(request, 'admin/create_group.html', {'form': form})


#GROUP LIST (Admin can do) 
@user_passes_test(is_admin, login_url='no-permission')
def group_list(request):
    groups = Group.objects.prefetch_related('permissions').all()
    return render(request, 'admin/group_list.html', {'groups': groups})

#DELETE USER (Admin can do) 
@user_passes_test(is_admin, login_url='no-permission')
def delete_user(request, user_id):
    try:
        target_user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        from django.http import Http404
        raise Http404("User not found")
    if target_user.is_superuser:
        messages.error(request, "Superuser cannot be deleted.")
        return redirect('user-list')
    
    username = target_user.username
    target_user.delete()
    messages.success(request, f"User '{username}' deleted successfully.")
    return redirect('user-list')

@login_required
def profile(request):
    return render(request, 'accounts/profile.html', {'user': request.user})

