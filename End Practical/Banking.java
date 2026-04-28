class Account{
    int user_id;
    long balance;
}
class SavingAccount{
    Account ac;
    Account Savings(int user_id,long balance){
        ac=new Account();
        ac.user_id=user_id;
        ac.balance=balance;
        return ac;
    }
};
class SalaryAccount{
    Account ac;
    Account Salary(int user_id,long balance){
        ac=new Account();
        ac.user_id=user_id;
        ac.balance=balance;
        return ac;
    }
};
class Banking{
    public static void main(String[] args) {
        SavingAccount sa=new SavingAccount();
        SalaryAccount sa1=new SalaryAccount();
        Account ac1=sa.Savings(123, 10000);
        Account ac2=sa1.Salary(456, 20000);
        System.out.println("Saving Account: User ID: "+ac1.user_id+" Balance: "+ac1.balance);
        System.out.println("Salary Account: User ID: "+ac2.user_id+" Balance: "+ac2.balance);
    }
}