function Dashboard({user,onLogout}){
    return(
        <>
            <h2>Welcome, {user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Country</strong> {user.country}</p>
            <p><strong>Bio:</strong> {user.bio}</p>

            <button onClick={onLogout}>Logout</button>
        </>
    );
}
export default Dashboard;