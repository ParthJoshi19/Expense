import React, { useState, useEffect, useCallback } from 'react';

const ExpenseInput = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [addExpense, setAddExpense] = useState([]);
    const [key,setKey]=useState(null)
    useEffect(()=>{
        key?alert("Your Expense has been added successfully!"):""
    },[key])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const expense = {
            id: Date.now(),
            description,
            amount: parseFloat(amount),
            category,
            date,
        };
        setAddExpense((prevExpenses) => [...prevExpenses, expense]);
        // saveTOLS();
        setDescription('');
        setAmount('');
        setCategory('');
        setDate('');
        setKey(addExpense);
    }, [description, amount, category, date]);

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Add Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="font-semibold">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="rounded-lg border-2 border-gray-300 p-2"
                        placeholder="Enter expense description"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="rounded-lg border-2 border-gray-300 p-2"
                        placeholder="Enter amount"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="rounded-lg border-2 border-gray-300 p-2"
                        placeholder="Enter category"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="rounded-lg border-2 border-gray-300 p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold transition duration-300 hover:bg-teal-700" value={key}
                >
                    Add Expense
                </button>
            </form>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Expense List</h2>
                <ul className="space-y-4">
                    {addExpense.map((expense) => (
                        <li key={expense.id} className="p-4 border-b border-gray-200">
                            <p><span className="font-semibold">Description:</span> {expense.description}</p>
                            <p><span className="font-semibold">Amount:</span> ₹{expense.amount.toFixed(2)}</p>
                            <p><span className="font-semibold">Category:</span> {expense.category}</p>
                            <p><span className="font-semibold">Date:</span> {expense.date}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ExpenseInput;
