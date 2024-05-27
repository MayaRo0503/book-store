---

# **Git Flow Workflow Guide**

## **Introduction**

If your collaborators want to work with the Git Flow workflow in the same repository, they should follow these steps.

## **Steps to Follow**

### **1. Clone the Repository**

Each collaborator should start by cloning the repository to their local machine using the following command: 
```bash 
git clone <repository_URL>
```
Replace `<repository_URL>` with the URL of the repository on GitHub.

### **2. Install Git Flow (if not already installed)**

If Git Flow is not already installed on their machine, they should install it. They can follow the installation instructions provided by the Git Flow documentation for their operating system.

### **3. Initialize Git Flow**

Inside the cloned repository, each collaborator should initialize Git Flow using the following command: 
```bash 
git flow init
```
This sets up Git Flow for the repository and prompts them to specify the branch names for development, production, etc.

### **4. Fetch and Pull Changes**

Before starting any work, collaborators should ensure that they have the latest changes from the remote repository. They can do this by running:
```bash 
git fetch origin 
git pull origin develop
```
This fetches the latest changes from the remote repository and updates their local develop branch.

### **5. Start Working on a Feature/Release/Hotfix**

Collaborators can start working on a new feature, release, or hotfix by using the respective Git Flow commands:
- `git flow feature start`
- `git flow release start`
- `git flow hotfix start`

### **6. Work, Stage, and Commit Changes**

Collaborators should make changes to the codebase related to the feature, release, or hotfix they are working on. They should stage and commit their changes as usual using Git.

### **7. Finish the Feature/Release/Hotfix**

When the work is completed, collaborators can finish the feature, release, or hotfix using the respective Git Flow commands:
- `git flow feature finish`
- `git flow release finish`
- `git flow hotfix finish`

### **8. Push Changes to Remote Repository**

After finishing the feature, release, or hotfix, collaborators should push their changes to the remote repository using:
```bash 
git push
```
If they created a new tag, they should also push the tags using:
```bash 
git push origin --tags
```

By following these steps, your collaborators can work with the Git Flow workflow in the same repository, ensuring a consistent and organized development process.



***

## Performing Selenium Grid Tests

To perform Selenium Grid tests, follow these steps:

### Setting Up Selenium Grid (Standalone Server):

1. Navigate to the location where the latest Selenium Grid is located:

    ```bash
    cd C:\Users\ASUS\Downloads
    ```

2. Start the Selenium Grid standalone server:

    ```bash
    java -jar selenium-server-4.19.1.jar standalone
    ```

### Configuring Grid Nodes:

1. Open another command prompt window and navigate to the location where the latest Selenium Grid is located:

    ```bash
    cd C:\Users\ASUS\Downloads
    ```

2. Start the Selenium Grid node:

    ```bash
    java -jar selenium-server-4.19.1.jar node
    ```

3. Open a web browser and navigate to the address: [http://localhost:4444/](http://localhost:4444/).

### Running Grid Tests:

1. Navigate to the folder of your project:

    ```bash
    cd tests
    ```

2. Navigate to the `grid` subfolder:

    ```bash
    cd grid
    ```

3. Execute the command to run the grid tests:

    ```bash
    node runGridTests.js
    ```
### Running Load Tests:

1. Navigate to the folder of your project:

    ```bash
    cd tests
    ```

2. Navigate to the `ide` subfolder:

    ```bash
    cd ide
    ```

3. Execute the command to run the load tests:

    ```bash
    node load_test.js
    ```

### Updating Selenium Grid:

If it is necessary to update a version of Selenium Grid, follow these steps:

1. Download the latest version of Selenium Grid from the official website.

2. Replace the existing Selenium Grid files in the project folder with the new version.

3. Repeat the steps for setting up Selenium Grid and configuring grid nodes as mentioned above.

These steps should help you set up and run Selenium Grid tests successfully. <br>
Make sure to replace `C:\Users\ASUS\Downloads` with the actual location of your Selenium Grid files.

