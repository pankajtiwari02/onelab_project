import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "./home.css";
import { Base_User_Url } from "../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "../components/NavBar";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const App = () => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Base_User_Url}/user/allUsers`);
        console.log(response.data);
        setData([]);
        response.data.map((ele) => {
          const obj = {
            id: ele._id,
            email: ele.email,
            phoneNumber: ele.phoneNumber,
            name: ele.name,
          };
          setData((prev) => [...prev, obj]);
        });
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on search term (name)
    const filtered = data.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await axios.delete(`${Base_User_Url}/user/${userId}`, {
        withCredentials: true,
      });
      if (response.status == 200) {
        setData((prev) => prev.filter((ele) => ele.id != userId));
        Cookies.remove("access_token");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          alert(err.response.data.message);
        }
      }
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="app">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td className="icon" onClick={() => deleteUser(user.id)}>
                  <DeleteIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
