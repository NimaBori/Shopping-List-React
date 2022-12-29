import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import List from "./components/List";
import "animate.css";

function App() {
  const [item, setItem] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [alert, setAlert] = useState({
    msg: null,
    type: null,
  });
  const [renderIsOn, setRenderIsOn] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    items && setItemsList(items);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!edit && item) {
      setItemsList((prev) => [...prev, item]);
      renderAlert("One item added to your list.", "success");
    } else if (edit && item) {
      const NewItemsList = itemsList;
      NewItemsList.splice(editIndex, 1, item);
      setItemsList(NewItemsList);
      renderAlert("Item editted in your list.", "success");
      setEdit(false);
    } else {
      renderAlert("Please add value first!", "danger");
    }
    setItem("");
  };

  const handleOnEdit = (i) => {
    setEdit(true);
    setItem(itemsList[i]);
    setEditIndex(i);
  };

  const handleOnDelete = (i) => {
    const newList = itemsList.filter((item, index) => index !== i);
    setItemsList(newList);
    renderAlert("Item removed from your list.", "danger");
  };

  const renderAlert = (m, t) => {
    setRenderIsOn(true);
    const newAlert = {
      msg: m,
      type: t,
    };
    setAlert(newAlert);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRenderIsOn(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [renderIsOn]);

  useEffect(() => {
    if (itemsList.length > 0) {
      localStorage.setItem("items", JSON.stringify(itemsList));
    }
  }, [itemsList]);

  return (
    <Container className="text-center my-4 p-0 border rounded bg-light">
      <Container className="header p-0">
        <div className="py-3 text-white bg-dark rounded-top">
          <h1>Your Shopping List</h1>
        </div>
        <Container className="p-0">
          {renderIsOn && (
            <h4
              className={
                alert.type === "danger"
                  ? "text-danger bg-warning py-2 alert rounded-0 animate__animated animate__flash"
                  : "text-white bg-success py-2 alert rounded-0 animate__animated animate__flipInX"
              }
            >
              {alert.msg}
            </h4>
          )}
        </Container>
      </Container>
      <Container>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <input
            style={{ fontSize: "19px" }}
            type="text"
            placeholder="e.g. milk"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            autoFocus
          />
          <button className="submit-btn" type="submit">
            {!edit ? "Add" : "Edit"}
          </button>
        </form>
      </Container>
      <Container className="list-container">
        {itemsList.length > 0 &&
          itemsList.map((item, index) => (
            <List
              className="text-center"
              key={index}
              title={item}
              id={index}
              onEdit={(i) => handleOnEdit(i)}
              onDelete={(i) => handleOnDelete(i)}
            />
          ))}
      </Container>
      <Container className="mt-4 p-0 remove">
        {itemsList.length > 0 && (
          <h3
            className="text-danger py-2 m-0 bg-secondary rounded-bottom"
            onClick={() => {
              renderAlert("All items removed from your list.", "danger");
              setItemsList([]);
              localStorage.clear();
            }}
          >
            Clear All Items
          </h3>
        )}
      </Container>
    </Container>
  );
}

export default App;
