import { useState } from "react";
import InputBox from "./inputbox";

const Calculator=() => {

    const [loanAmount, setLoanAmount]=useState("");
    const [annualInterestRate, setAnnualInterestRate]=useState("");
    const [tenure, setTenure]=useState("");

    const [totalInterest, setTotalInterest]=useState("");
    const [totalPayment, setTotalPayment]=useState("");
    const [emiPerMonth, setEmiPerMonth]=useState("");

    const calculate=() => {
        // loanAmount = loanAmount*100000;
        let r = annualInterestRate/12/100;
        // console.log(r);
        
        let x = Math.pow((1+r),tenure);
        // console.log(x);
        
        let emiPerMonth = (loanAmount*r*x)/(x-1);
        // console.log(emi);
        
        let totalPayment = emiPerMonth*120;
        let totalInterest = totalPayment - loanAmount;
        console.log(totalPayment, totalInterest,emiPerMonth);
    };

    return (
        <div className="border-2 rounded-lg p-5">
            {/* <h1>Calculator</h1> */}
            <div className="flex flex-col gap-5 items-center">
                <div className="flex flex-col gap-5 sm:flex-row">
                    <InputBox value={loanAmount} placeholder={"Enter loan amount"} onChange={
                        (e) => {
                            setLoanAmount(e.target.value);
                        }
                    } />
                    <InputBox value={annualInterestRate} placeholder={"Enter annual interest rate"} onChange={
                        (e) => {
                            setAnnualInterestRate(e.target.value);
                        }
                    } />
                    <InputBox value={tenure} placeholder={"Enter tenure(number of months)"} onChange={
                        (e) => {
                            setTenure(e.target.value);
                        }
                    } />
                </div>
                <button className="button-2" onClick={calculate} disabled={(loanAmount!="")&&(annualInterestRate!="")&&(tenure!="")? false:true}>Calculate Now</button>
                {
                    (totalInterest!="")&&(totalPayment!="")&&(emiPerMonth!="")&&
                    (
                        <div className="flex flex-col sm:flex-col">
                            <p>Total Interest to be paid : {totalInterest}</p>
                            <p>Total Payment to be made : {totalPayment}</p>
                            <p>EMI per month : {emiPerMonth}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Calculator;