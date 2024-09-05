import React, { useState, useEffect, useCallback } from 'react';

const ExpenseInput = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [addExpense, setAddExpense] = useState([]);
    const [key, setKey] = useState(null);
    const [sum, setSum] = useState(0);

    const setSums = (newExpense = null, deletedAmount = null) => {
        let s = 0;
        addExpense.forEach(item => {
            s += parseFloat(item.amount);
        });

        if (newExpense) {
            s += parseFloat(newExpense.amount);
        }

        if (deletedAmount) {
            s -= parseFloat(deletedAmount);
        }


        setSum(s); 
    };

    useEffect(() => {
        const exp = localStorage.getItem("addExpense");
        const storedSum = localStorage.getItem("sum");
        if (exp) {
            const expen = JSON.parse(exp);
            setAddExpense(expen);
            setSums(); 
        }
        if (storedSum) {
            setSum(parseFloat(storedSum)); 
        }
    }, []);

    useEffect(() => {
        if (sum > 0 || addExpense.length > 0) {
            localStorage.setItem("sum", JSON.stringify(sum));
        }
    }, [sum]);

    const saveTOLS = (updatedExpenses) => {
        localStorage.setItem("addExpense", JSON.stringify(updatedExpenses));
    };

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const expense = {
            id: Date.now(),
            description,
            amount: parseFloat(amount),
            category,
            date,
        };
        const updatedExpenses = [...addExpense, expense];
        setAddExpense(updatedExpenses);
        setSums(expense); 

        saveTOLS(updatedExpenses); 

        setDescription('');
        setAmount('');
        setCategory('');
        setDate('');
        setKey(updatedExpenses);
    }, [description, amount, category, date, addExpense]);

    const handleDelete = (id, amount) => {
        if(addExpense.length-1===0){
            localStorage.setItem("sum",JSON.stringify(0));
        }
        const updatedExpenses = addExpense.filter((expense) => expense.id !== id);
        setAddExpense(updatedExpenses);
        setSums(null, amount);
        saveTOLS(updatedExpenses); 
    };

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
                    className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold transition duration-300 hover:bg-teal-700"
                    value={key}
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
                            <p><span className="font-semibold">Amount:</span> ₹{expense.amount}</p>
                            <p><span className="font-semibold">Category:</span> {expense.category}</p>
                            <p><span className="font-semibold">Date:</span> {expense.date}</p>
                            <button
                                onClick={() => handleDelete(expense.id, expense.amount)}
                                className="p-1 bg-red-600 text-center text-white py-2 rounded-lg font-bold text-[20px] transition duration-300 hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="w-full bg-teal-600 text-center text-white py-2 rounded-lg font-bold text-[20px] transition duration-300 hover:bg-teal-700">
                    Total : ₹{sum}
                </div>
            </div>
        </div>
    );
};

export default ExpenseInput;
