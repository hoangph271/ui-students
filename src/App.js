import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const API_ROOT = "https://rest-students.herokuapp.com";
// const API_ROOT = "http://localhost:8080";

const _fetchApi = async ({ url, method = "GET", body, headers = {} }) => {
  const res = await fetch(`${API_ROOT}${url}`, {
    method,
    ...(body && { body }),
    ...(headers && { headers })
  }).catch(e => {
    toast(e.message);
    throw e;
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error(await res.text());
};

const getApi = ({ url }) => _fetchApi({ url });
const postApi = ({ url, body }) => {
  return _fetchApi({
    url,
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const useStatus = () => {
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const Status = props => {
    if (error) return props.error(error);

    if (results) {
      return results.length === 0 ? props.empty() : props.success(results);
    }

    return props.loading();
  };

  return { Status, setError, setResults };
};

const useInput = (init = "") => {
  const [value, setValue] = useState(init);

  const onChanged = e => {
    e.preventDefault();

    setValue(e.target.value);
  };

  return [value, onChanged];
};

const StudentForm = ({ onStudentCreated }) => {
  const [name, onNameChanged] = useInput();
  const [level, onLevelChanged] = useInput();
  const [age, onAgeChanged] = useInput();

  const handleCreateClicked = async e => {
    e.preventDefault();

    const res = await postApi({
      url: "/student",
      body: {
        name,
        level,
        age: age.length > 0 ? Number(age) : null
      }
    });

    if (res.ok) {
      onStudentCreated();
    } else {
      toast(await res.text());
    }
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <input value={name} onChange={onNameChanged} placeholder="name" />
      <input
        value={age}
        onChange={onAgeChanged}
        placeholder="age"
        type="number"
      />
      <input value={level} onChange={onLevelChanged} placeholder="level" />
      <input type="submit" value="Create" onClick={handleCreateClicked} />
    </form>
  );
};

const App = () => {
  const [updatedAt, setUpdatedAt] = useState(Date.now());

  return (
    <main>
      <StudentForm onStudentCreated={() => setUpdatedAt(Date.now())} />
      <StudentList key={updatedAt} />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
};

export default App;

const StudentList = () => {
  const { Status, setResults, setError } = useStatus();

  useEffect(() => {
    let isMounted = true;

    getApi({ url: "/student" })
      .then(students => isMounted && setResults(students))
      .catch(error => isMounted && setError(error));

    return () => {
      isMounted = false;
    };
  }, [setError, setResults]);

  return (
    <Status
      loading={() => <div>{"..."}</div>}
      empty={() => <div>{"Ø"}</div>}
      error={error => <pre>{error.message}</pre>}
      success={students => (
        <ul>
          {students.map(student => (
            <li key={student._id}>
              <span>{student.name}</span>
              {" - "}
              <span>{`a ${student.age} year${
                student.age ? "s" : ""
              } old`}</span>
              {student.level && <span>{` ${student.level}`}</span>}
            </li>
          ))}
        </ul>
      )}
    />
  );
};
