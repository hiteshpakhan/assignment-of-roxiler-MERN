here we have created the project 

inside .env
    
    MONGODB_URI=mongodb+srv://pakhan:pakhan@cluster0.e1ybkxr.mongodb.net/rolixer?retryWrites=true&w=majority&appName=Cluster0

created mongodb url on account : hitesh5pakhan@gmail.com, database name : project, 


# Api Routes :

for gatting table data 
    
    get : http://localhost:8080/transactions/list?page=1&search=""&limit=10&month="" 

for getting statistic report

    get : http://localhost:8080/transactions/statistics?month=""

for getting barchart

    get : http://localhost:8080/transactions/barchart?month=""