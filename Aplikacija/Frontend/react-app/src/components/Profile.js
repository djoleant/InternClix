import EmployerInfoPage from "../EmployerInfoPage";
import StudentProfilePage from "../StudentProfilePage";

export default function Profile() {
    const role = localStorage.getItem("role");
    if (role === "Student") {
        return <StudentProfilePage />;
    }
    else
        return <EmployerInfoPage />;
}