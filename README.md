# Test task - CRM with big data sets

---

## Additional Technologies Used
-**React**
-**TypeScript**
-**Tailwind CSS**
-**Vitest**

### Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:

```bash
npm install && npm run dev
```
To run tests

```bash
npm run test
or
npm run test:ui
```
# Requirements:
1. Dashboard page:
o Display the list of users in a grid or list view.
o Each user should show their name, email, and a small avatar image.
o Implement pagination as infinite list for the list view to handle the large dataset
efficiently.
o Implement virtualization for the list to ensure smooth scrolling.
o At least three different filters (e.g., age range, gender, location) should be
implemented as dropdowns, sliders, or input fields.
o Apply the filters on the dataset and dynamically update the user list.
2. User details page:
o When a user clicks on a user in the list view, display a details page for that user.
o The details page should show all available information about the user, including
their contact details, address, and any other relevant information.
o Provide a way for the user to navigate back to the list view.
Additional for senior level:
o On the user details page, display the user&#39;s order history.
o Each order should show order date, order number, and total amount.
o Orders should be displayed in a list or table format.
3. Documentation
o Provide a README file with instructions on how to run the application and any
additional information or considerations.
Bonus Points:
o Additinal for senior level - Add lazy loading for User orders
o Write unit tests for critical components or functions.
o Display a friendly error message if there are any issues with data loading or
filtering
o Ensure that the application works well on different screen sizes (desktop, tablet,
mobile).