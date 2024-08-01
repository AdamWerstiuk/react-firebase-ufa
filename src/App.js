import { useEffect, useState } from "react";
import './App.css';
import { Auth } from "./components/auth";
import { db, auth } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

function App() {
  const [userList, setUserList] = useState([]);

  //new user 
  const [newUserName, setNewUserName] = useState("")
  const [newBalance, setNewBalance] = useState(0)

  const [updatedBalance, setUpdatedBalance] = useState(0)

  const userCollection = collection(db, "users")

 
    const getUserList = async () => {
      //read data
      //set userList = data
      try {
        const data = await getDocs(userCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id,
        }));
        setUserList(filteredData);
      } catch (err) {
        console.log(err);
      }
      
    };
    

  useEffect(() => {
    getUserList();
  }, [])

  const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id)
      await deleteDoc(userDoc);

      getUserList();
    } catch(err) {
      console.error(err);
    }
  };

  const updateUserBalance = async (id) => {
    try {
      const userDoc = doc(db, "users", id)
      await updateDoc(userDoc, {balance: updatedBalance});

      getUserList();
    } catch(err) {
      console.error(err);
    }
  };
  
  const onGiveMoney = async () => {
    try {
      await addDoc(userCollection, {
        name: newUserName,
        balance: newBalance,
        userID: auth.currentUser?.uid,
      });

      getUserList();

    } catch(err) {
      console.error(err);
    }
    
  };

  return (
    <div className="App">
      <Auth>
        
      </Auth>

      <div>
        <input placeholder = "How much" type = "number" onChange = {(e) => setNewBalance(Number(e.target.value))}>
        </input>

        <input placeholder = "To whom" onChange = {(e) => setNewUserName(e.target.value)}></input>
        <button onClick = {onGiveMoney}>Give</button>
      </div>

      <div>
        {userList.map((user) => (
          <div>
            <h1 style = {{color: user.balance >= 0 ? "green" : "red"}}> {user.name} </h1>
            <p> Balance: {user.balance} </p>
            <button onClick = {() => deleteUser(user.id)}>Delete User</button>

            <input 
              placeholder = "New balance..." 
              onChange = {(e) => setUpdatedBalance(e.target.value)}>

            </input>
            <button onClick = {() => updateUserBalance(user.id)}>Update Balance</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
