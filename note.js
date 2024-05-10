// const x; x is a ค่าคงที่
// let x; x is a variable

//Arrow function
//new form

//function_name = variable used in function => return value
// ไม่ต้องใส่ปีกกาหรือ return ก็ได้ ใช้ในกรณีที่มีคำสั่งไม่เยอะ 

const fullname = (fname,lname) => fname+lname

// console.log(fullname("nattapat","dungdee"));

const age = 21;

const customer = {
    name : "Nattapat",
    age,
    tel : "0645402317",
    showdata(){ // method that define in object can use with the external const that define out of object only
        console.log(age)
    }
}

customer.showdata()






