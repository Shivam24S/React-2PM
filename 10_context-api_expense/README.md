# Context API Expense Tracker

A client-side expense tracker built with React and Vite. The project is an
example of sharing application state across multiple components with the
React Context API and managing state transitions with `useReducer`.

The application lets users:

- Add income (`Credit`) and expenses (`Debit`)
- Edit existing transactions
- Delete transactions
- Search transactions by title
- Filter transactions by type and category
- Sort transactions by ID or amount
- View total credit, debit, and balance values
- Persist transactions in the browser's `localStorage`

> This is an educational project focused on Context API and reducer patterns.
> It does not use a backend or a database.

## Tech stack

- [React](https://react.dev/) 19
- [React DOM](https://react.dev/reference/react-dom) 19
- [Vite](https://vite.dev/) 8
- JavaScript with JSX
- React Context API
- `useReducer`, `useState`, `useEffect`, and `useContext`
- Browser `localStorage`
- ESLint

## Requirements

- Node.js 18 or newer
- npm 9 or newer

Check the installed versions:

```bash
node --version
npm --version
```

## Getting started

### 1. Install dependencies

From the project directory, run:

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173
```

The development server supports hot module replacement, so changes to the
source files are reflected in the browser automatically.

### 3. Create a production build

```bash
npm run build
```

The optimized output is generated in the `dist/` directory.

### 4. Preview the production build

```bash
npm run preview
```

### 5. Run ESLint

```bash
npm run lint
```

## Project structure

```text
10_context-api_expense/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── Add.jsx
│   │   ├── ExpenseList.jsx
│   │   └── ExpenseStats.jsx
│   ├── concept/
│   │   └── CounterUseReducer.jsx
│   ├── context/
│   │   └── ExpenseContext.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

### Important files

| File | Responsibility |
| --- | --- |
| `src/main.jsx` | Creates the React root and wraps the application with `ExpenseContext` |
| `src/App.jsx` | Composes the add form, statistics, and expense list |
| `src/context/ExpenseContext.jsx` | Owns shared state, reducer actions, persistence, and calculated totals |
| `src/components/Add.jsx` | Controlled form for creating and editing transactions |
| `src/components/ExpenseList.jsx` | Search, filter, sort, display, edit, and delete controls |
| `src/components/ExpenseStats.jsx` | Displays credit, debit, and balance totals |
| `src/concept/CounterUseReducer.jsx` | Separate reducer example kept for learning/reference |

## Application architecture

The application follows this data flow:

```text
main.jsx
   │
   └── ExpenseContext provider
          │
          └── App
               ├── Add
               ├── ExpenseStats
               └── ExpenseList
```

`ExpenseContext` is the single shared state layer. Child components do not
receive expense data through prop drilling. Instead, they call
`useContext(expenseContext)` to read the state and invoke the handler
functions exposed by the provider.

### Context value

The provider exposes:

| Value | Description |
| --- | --- |
| `expenseList` | Array of all saved transactions |
| `handleAdd(input)` | Adds a transaction or updates the transaction currently being edited |
| `handleDelete(id)` | Removes a transaction by ID |
| `handleEdit(id)` | Selects a transaction and loads it into the form |
| `editVal` | The transaction currently selected for editing, or `null` |
| `credit` | Sum of all transactions whose type is `Credit` |
| `debit` | Sum of all transactions whose type is `Debit` |
| `balance` | `credit - debit` |

## Expense data model

Each transaction uses the following shape:

```js
{
  id: 1,
  Title: "movie",
  Description: "spider man 2",
  Amount: 500,
  Date: "2026-10-15",
  Category: "General Expense",
  ExpenseType: "Debit"
}
```

### Fields

| Field | Description |
| --- | --- |
| `id` | Unique identifier generated from the current timestamp for new records |
| `Title` | Short transaction name used by the title search |
| `Description` | Additional transaction details |
| `Amount` | Numeric input stored from the form |
| `Date` | Transaction date |
| `Category` | Transaction category |
| `ExpenseType` | Either `Credit` or `Debit` |

The initial state contains two example debit records. On first load, these
records are used unless a previously saved `expense` value exists in
`localStorage`.

## State management

The provider initializes state with `useReducer`:

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

The third argument, `init`, reads the saved transaction list from
`localStorage`. This allows the application to restore the user's data after a
page refresh.

### Reducer actions

| Action | Payload | Behavior |
| --- | --- | --- |
| `add` | Transaction object | Adds a new transaction, or merges changes into the selected transaction |
| `delete` | Transaction ID | Removes the matching transaction |
| `update` | Transaction ID | Finds the transaction and stores it in `editVal` |

After every change to `state.expenseList`, an effect saves the list under the
`localStorage` key `expense`:

```js
localStorage.setItem("expense", JSON.stringify(state.expenseList));
```

To clear the application's saved data while developing, run this in the
browser console and refresh:

```js
localStorage.removeItem("expense");
```

## Using the application

### Add a transaction

1. Enter a title, description, amount, and date.
2. Select a category.
3. Select `Credit` for money received or `Debit` for money spent.
4. Click **add**.

The new transaction appears in the list and is persisted locally.

### Edit a transaction

1. Click **Edit** in the transaction table.
2. The selected transaction is copied into the form.
3. Change any values.
4. Click **update**.

The reducer updates the matching record and clears the edit selection.

### Delete a transaction

Click **Delete** beside a transaction. It is removed from the shared state and
from `localStorage` on the next persistence effect.

### Search, filter, and sort

The list supports:

- Case-insensitive title matching
- `Credit` or `Debit` filtering
- Category filtering
- ID ascending or descending sorting
- Amount ascending or descending sorting

The displayed rows are calculated in three stages:

```text
expenseList → title filter → type filter → category filter → sort
```

The filter values are applied as they change. The **search** button submits the
form but does not perform a separate server-side search.

## Calculations

The statistics are derived from the current `expenseList`:

```text
credit  = sum of Credit amounts
debit   = sum of Debit amounts
balance = credit - debit
```

Amounts are converted with `Number()` before they are added, so values entered
through the HTML number field can be used in arithmetic.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint against the project |

## Browser storage and limitations

- Data is stored only in the current browser profile.
- Clearing site data removes the saved transactions.
- Data is not synchronized between browsers or devices.
- There is no authentication or multi-user support.
- There is no backend validation or remote persistence.
- The application currently uses basic form controls and styling.

## Possible improvements

Potential next steps for extending the project include:

- Add form validation for required fields and positive amounts.
- Replace `alert` and console logging with visible UI feedback.
- Add a confirmation dialog before deletion.
- Use stable IDs such as `crypto.randomUUID()`.
- Extract category and transaction-type options into shared constants.
- Add pagination for large transaction lists.
- Add charts for category and monthly spending.
- Add automated component and reducer tests.
- Add a backend or database for synchronization and authentication.

## Learning objectives

This project demonstrates:

1. Creating and consuming a React context.
2. Avoiding prop drilling for shared application state.
3. Modeling state transitions with reducer actions.
4. Combining context with `useReducer`.
5. Persisting client-side state with `useEffect` and `localStorage`.
6. Deriving totals and filtered views from source state.
7. Building controlled React forms for both create and edit flows.
