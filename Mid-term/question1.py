class StudentDatabase:
    student_list = []

    @classmethod
    def add_student(self, std):
        self.student_list.append(std)

class Student():
    def __init__(self, student_id, name, department, is_enrolled):
        self.__student_id = student_id
        self.__name = name
        self.__department = department
        self.__is_enrolled = is_enrolled
        StudentDatabase.add_student(self)  

    def enroll_student(self):
        if self.__is_enrolled:
            print(f"Student {self.__student_id} is Already Enrolled!")
        else:
            self.__is_enrolled = True
            print(f"Student {self.__student_id} Has been Enrolled!")

    def drop_student(self):
        if not self.__is_enrolled:
            print(f"Student {self.__student_id} is not Enrolled!")
        else:
            self.__is_enrolled = False
            print(f"Student {self.__student_id} has been Dropped!")

    def view_student_info(self):
        print(f"ID: {self.__student_id}, Name: {self.__name}, Department: {self.__department}, Enrolled: {self.__is_enrolled}")
    
    def get_id(self):
        return self.__student_id


s1 = Student("655087", "Anayet Hasan Niloy", "CSE", True)
s2 = Student("655092", "Ornate Blaise Peraera", "Civil", True)
s3 = Student("655121", "Adnan Jitu", "Physics", True)


while (1):
    print("\n--Student Management Menu ---")
    print("1. View All Student")
    print("2. Enroll Student")
    print("3. Drop Student")
    print("4. Exit")

    val = input("Enter Your choice (1-4): ")
    
    try:
        if val == '1':
            if not StudentDatabase.student_list:
                print("No Student Found")
            else:
                for std in StudentDatabase.student_list:
                    std.view_student_info()

        elif val == '2':
            std_id = input("Enter Student ID to Enroll: ")
            flag = False
            for std in StudentDatabase.student_list:
                if std.get_id() == std_id:
                    std.enroll_student()
                    flag = True
                    break
            if not flag:
                print("Error: Invalid student ID.")

        elif val == '3':
            std_id = input("Enter Student ID to Drop: ")
            ok = False
            for std in StudentDatabase.student_list:
                if std.get_id() == std_id:
                    std.drop_student()
                    ok = True
                    break
            if not ok:
                print("Error: Invalid Student ID.")

        elif val == '4':
            print("Exiting System...")
            break
        else:
            print("Invalid choice. Please select 1-4.")
    except Exception as e:
        print(f"Error: {e}")
