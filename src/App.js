import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  function handleShowForm() {
    setShowForm((showForm) => !showForm);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowForm(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showForm && <FriendAddForm onAddFriend={handleAddFriend} />}
        <Button handler={handleShowForm}>
          {showForm ? " Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function FriendAddForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/48");
  function addFriendHandler(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      imgUrl: `${imgUrl}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
  }
  return (
    <>
      <form onSubmit={addFriendHandler} className="form-add-friend">
        <label>🧑‍🤝‍🧑Friend Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>🦊Image URL</label>
        <input
          type="text"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>💰Bill Value</label>
      <input type="text" />
      <label>🧍‍♂️Your Expense</label>
      <input type="text" />
      <label>🧑‍🤝‍🧑X's Expense</label>
      <input type="text" disabled />
      <label>💰Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split</Button>
    </form>
  );
}

function Button({ children, handler }) {
  return (
    <button className="button" onClick={handler}>
      {children}
    </button>
  );
}
