import InputBox from "./inputbox";

const Calculator=({
    loanAmount, setLoanAmount,
    annualInterestRate, setAnnualInterestRate,
    tenure, setTenure,
    totalInterest, setTotalInterest,
    totalPayment, setTotalPayment,
    emiPerMonth, setEmiPerMonth
}) => {

    const calculate=() => {
        let rateOfInterest=annualInterestRate/12/100;
        let amount=Math.pow((1+rateOfInterest), tenure);

        const emi=(loanAmount*rateOfInterest*amount)/(amount-1);

        setEmiPerMonth(emi.toFixed(2));
        setTotalPayment((emi*tenure).toFixed(2));
        setTotalInterest((emi*tenure-loanAmount).toFixed(2));
    };

    return (
        <div className="border-2 rounded-lg p-5">
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
                        <div className="flex flex-col">
                            <p>EMI per month : &#x20b9; {emiPerMonth}</p>
                            <p>Total Interest to be paid : &#x20b9; {totalInterest}</p>
                            <p>Total Payment to be made : &#x20b9; {totalPayment}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Calculator;