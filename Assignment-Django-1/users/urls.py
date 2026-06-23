from django.urls import path
from users.views import sign_up, sign_in, activate_user, user_list, assign_role, create_group, group_list, delete_user, profile
from users.views import EditProfileView, ChangePassword, SignInView, SignUpView
from django.contrib.auth.views import LogoutView, PasswordChangeDoneView

urlpatterns = [
    path('profile/', profile, name='profile'),
    path('edit-profile/', EditProfileView.as_view(), name='edit-profile'),
    path('change-password/', ChangePassword.as_view(), name='change-password'),
    path('change-password/done/', PasswordChangeDoneView.as_view(template_name='accounts/password_change_done.html'), name='password-change-done'),
    # path('sign-up/', sign_up, name='sign-up'),
    path('sign-up/', SignUpView.as_view(), name='sign-up'),
    # path('sign-in/', sign_in, name='sign-in'),
    path('sign-in/', SignInView.as_view(), name='sign-in'),
    # path('sign-out/', sign_out, name='sign-out'),
    path('logout/', LogoutView.as_view(next_page = 'home'), name='sign-out'),
    path('activate/<int:user_id>/<str:token>/', activate_user, name='activate-user'),
    path('user-list/', user_list, name='user-list'),
    path('assign-role/<int:user_id>/', assign_role, name='assign-role'),
    path('create-group/', create_group, name='create-group'),
    path('groups/', group_list, name='group-list'),
    path('delete-user/<int:user_id>/', delete_user, name='delete-user'),
]