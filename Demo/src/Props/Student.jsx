function StudentPortfolio(){
    const student = {
        name: "raghava",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7BVeeelL1mKOuOaVSNeFrUKkKQPnLJH7a_w&s",
        description: "A Passionate Student who was eager to join MRUH"
    }
    const styles = {
        container:{
            border: '1px solid #ccc',
            padding: '16px',
            borderRadius: '8px',
            width: '300px'
        },
        image:{
            width: '150px',
            height: '150px',
            borderRadius: '8px'
        }
    }
    return(
        <div style={styles.container}>
            <h2>{student.name}</h2>
            <img style={styles.image} src={student.imageUrl} alt="Student" />
            <p>{student.description}</p>
        </div>
    );
}
export default StudentPortfolio;
