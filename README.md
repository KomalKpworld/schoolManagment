create rest json response api-  No cookies and sessions
# School application: user can create school and share invite code to parent and teacher to sign up. (unique Invite code generated by system). Store user with their roles for specific school.

Api can manage multiple schools.
if user signup without invite code means user must have to create new school and assign
with admin role.

1. Sign Up
   Fields: Name, Email, Password, Photo
   Optional: Invite code for parent, Invite code for teacher
2. Login
   Fields: Email, Password

## below api will auth by apikey and token
3. create school (auto create unique invite codes)
   Fields: Name, Photo
4. get My Schools (return school with user's role (admin, teacher, parent))
5. create class
   Fields: Name, school_id
6. get class by school_id

7. create student
   Fields: Name, photo, school_id

8. get students
   Fields : school_id or class_id
9. assign student to class
   Fields: class_id, student_id
10. get students which are part of all created class
    for example, student A is assigned to all created classes then return in this api.
11. get classmates of specific student. Which are classmates and part of all classes of specific
    student
    Fields: student_id
    for example, Student A ,B and C. A assigned to class 1,2 and 3. also B assigned to 1,2 and 3.
    C assigned to 1 and 2.
    this api will return B for A (student_id input). C can not return due to not part of class 3
