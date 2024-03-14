# Household Budget Tracker

This is a simple web application for tracking household incomes and expenses. It provides functionality to add incomes and expenses categorized by amount, category, and cycle (monthly, bi-weekly, weekly). Users can also view a summary of their transactions for selected months.

## Features

- Add incomes with amount, category, cycle, and month
- Add expenses with amount, category, cycle, and month
- View a summary of transactions for selected months

## Usage

1. Open the `index.html` file in a web browser.
2. Use the buttons in the header to navigate between income, expense, and summary pages.
3. On the income page, fill in the amount, category, cycle, and month, then click "Add" to add an income.
4. On the expense page, fill in the amount, category, cycle, and month, then click "Add" to add an expense.
5. On the summary page, select a month from the dropdown menu to view a summary of transactions for that month.

## File Structure

- `index.html`: HTML file containing the structure of the web application and user interface elements.
- `styles.css`: CSS file containing styles for the web application.
- `script.js`: JavaScript file containing the logic for adding incomes and expenses, displaying summaries, and handling user interactions.

## Docker Deployment

To deploy the application using Docker:

1. Build the Docker image using the provided Dockerfile.
2. Run a Docker container from the built image.
3. Access the application through the exposed port.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
