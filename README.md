### **Frontend**

#### **1. Prerequisites**
- **Node.js** (v14 or later)

#### **2. Setup**
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/YaAlB/decidr.git
   cd decidr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

4. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

#### **3. Features**
- **File Upload**:
  - Drag and drop a CSV file or use the upload button.
- **Search**:
  - Filter results dynamically using the search bar.
- **Sorting**:
  - Click on table column headers to sort data by various fields.
- **Pagination**:
  - Navigate through pages to view more results.

---

## **File Structure**

### **Frontend**
```
frontend/
├── src/
│   ├── components/        # Reusable UI components (Table, Modal, Pagination)
│   ├── redux/             # Redux store and slices
│   ├── services/          # API integration (upload, fetchPeople)
│   ├── types/             # Shared TypeScript interfaces
│   ├── App.tsx            # Main app component
│   ├── index.tsx          # React entry point
├── public/
│   ├── index.html         # HTML template
├── package.json
├── tsconfig.json          # TypeScript configuration
```

---

## **Testing**

### **Backend**
1. **Upload the Provided CSV**:
   - Use Postman, `curl`, or the frontend to upload `StarWarsCharacters.csv`.

2. **Verify Data**:
   - Use MongoDB tools or the `GET /api/people` endpoint to check if data is stored and retrieved correctly.

### **Frontend**
1. **Upload a File**:
   - Drag and drop the provided CSV or click the upload button.
2. **Search and Sort**:
   - Test the search functionality by entering names or affiliations.
   - Click on table headers to sort by different fields.
3. **Pagination**:
   - Navigate between pages using the pagination controls.

---

## **Notes**
- Ensure the backend (`http://localhost:8000`) and frontend (`http://localhost:3000`) are running simultaneously for full functionality.
- Use the provided CSV file (`StarWarsCharacters.csv`) for testing.
- For any issues or questions, feel free to reach out.
