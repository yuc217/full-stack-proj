interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartWithRequirements extends CoursePartWithDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartWithRequirements ; 

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

interface HeaderProps {
  text: string
};

const Header = (props: HeaderProps) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

interface ContentProps {
  courseParts: CoursePart[];
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {/* {props.courseParts.map(part => <p key={part.name}>{part.name} {part.exerciseCount}</p>)} */}
      {props.courseParts.map(part => <Part key={part.name} part={part} />)}
    </div>
  );
};

interface TotalProps {
  total: number;
};

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises {props.total}
      </p>
    </div>
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises): {part.description}
        </p>
      );
    case "group":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises): Group projects ({part.groupProjectCount})
        </p>
      );
    case "background":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises): {part.description} <br />
          Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );
    case "special":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises): {part.description} <br />
          Requirements: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header text={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;