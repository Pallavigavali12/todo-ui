import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { toast } from "react-toastify";

import { TiDelete } from "react-icons/ti";
import api from "../api/api";
function Home() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const addtodo = async (e) => {
    e.preventDefault();
    console.log(value);
    const response = await api.post("http://localhost:3000/api/todos/addtodo", {
      task: value,
    });
    if (response.status == 201) {
      setValue("");
      get_todolist();
      setOpen(false);
      toast.success("task added succesfully!");
    }
  };

  const deletetodo = async (todo) => {
    try {
      
      const response = await api.delete(
        `http://localhost:3000/api/todos/deletetodo/${todo._id}`
      );
      console.log(response);
      if (response.status === 201) {
        get_todolist();
        toast.success("task deleted succesfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const get_todolist = async () => {
    try {
      const response = await api.get("http://localhost:3000/api/todos/todos");
      console.log(response);
      setTodo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updatestatus = async (status) => {
    try {
      console.log(status);
      const response = await api.put(
        `http://localhost:3000/api/todos/updatetodo/${status.id}`,
        { status: status.status }
      );
      if (response.status === 201) {
        get_todolist();
        toast.success("status updated succesfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    get_todolist();
  }, []);
  return (
    <div className="flex flex-col p-5 items-center  h-full">
      <div className="bg-[#a18aff] p-3 w-[600px] h-[650px] flex flex-col">
        <div className="text-white font-bold text-2xl p-5">
          <h2>ToDo List</h2>
          <t3>Todays main focus</t3>
        </div>
        <div className="p-5 gap-3 flex flex-col">
          <button
            className="p-3 text-white  bg-[#231b41] rounded-lg flex justify-center items-center w-fit "
            onClick={() => setOpen(true)}
          >
            <IoIosAddCircle size={25} /> <span>Add Task</span>
          </button>
          {open && (
            <form onSubmit={addtodo}>
              <input
                type="text"
                placeholder="add your task here...."
                className="px-5 py-10 rounded-lg w-full border-none outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></input>
              <button
                className="p-2 text-white  bg-[#231b41] rounded-lg mt-2 w-full"
                type="submit"
              >
                submit
              </button>
            </form>
          )}

          <div className="text-white h-auto p-5">
            {todo.length > 0 ? (
              <div
                className="max-h-64 overflow-y-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {todo.map((todo, index) => (
                  <div
                    key={index}
                    className="bg-white w-full rounded-2xl px-3 py-3 text-black flex justify-between items-center mb-2"
                  >
                    <span>{todo.task}</span>
                    <div className="flex items-center">
                      <TiDelete
                        color={"red"}
                        size={25}
                        onClick={() => deletetodo(todo)}
                      />
                      {todo.status ? (
                        <IoCheckmarkCircle
                          color={"green"}
                          size={20}
                          onClick={() =>
                            updatestatus({ id: todo._id, status: false })
                          }
                        />
                      ) : (
                        <FaRegCircle
                          color={"#a18aff"}
                          size={18}
                          onClick={() =>
                            updatestatus({ id: todo._id, status: true })
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No Tasks</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
