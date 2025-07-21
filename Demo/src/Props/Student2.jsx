function StudentPortfolio2({
    name="not defined",
    imageUrl="https://cdn.creazilla.com/cliparts/1722949/college-student-clipart-md.png",
    description="not provided"}){
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
            <h2>{name}</h2>
            <img style={styles.image} src={imageUrl} alt="Student" />
            <p>{description}</p>
        </div>
    );
}

export default StudentPortfolio2;
