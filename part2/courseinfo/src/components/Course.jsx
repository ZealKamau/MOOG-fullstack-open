const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  // Calculate total exercises
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}

      <p>
        <strong>Total exercises: {total}</strong>
      </p>
    </div>
  );
};

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
