import StudentPortfolio from "./Student";
import StudentPortfolio2 from "./Student2";

function App(){
  return(
    <div>
      <h1>Student Portfolio</h1>
      <StudentPortfolio2 
      name ="raghav"
      imageUrl = "https://i0.wp.com/rollercoasteryears.com/wp-content/uploads/Thrive-During-Finals-.jpg?fit=1000%2C667&ssl=1"
      description = "GOOD STUDENT"
      />
      <StudentPortfolio2 
      imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjEtg_QkdwpzFUOcB1HxU2V2nr5VGZMcsJvw&s"
      description = "BAD STUDENT"
      />
      <StudentPortfolio2/>
    </div>
  );
}
export default App;
