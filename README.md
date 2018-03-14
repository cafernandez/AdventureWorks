# AdventureWorks

### Database Query for not checking whether Person exists

```sh
USE AdventureWorks;  
GO  
ALTER TABLE HumanResources.Employee 
NOCHECK CONSTRAINT FK_Employee_Person_BusinessEntityID;  
GO  
```
