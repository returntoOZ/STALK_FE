import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BottomBar from "../component/global/bottomBar";
import TopBar from "../component/global/topBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { stockList } from "../component/search/searchBar";

const StockName = styled.div`
  display: flex;
  color: white;
  font-weight: bold;
  width: 90vw;
  height: 13vh;
  margin: auto;
  align-items: flex-end;
  font-size: larger;
`;

const PriceBox = styled.div`
  display: flex;
  color: white;
  margin-top: 1.5rem;
  justify-content: space-around;
`;

const PriceBoxLeft = styled.div`
  color: lightgray;
`;

const PriceBoxRight = styled.div`
  color: white;
`;

const PurchastText = styled.div`
  color: white;
  margin-top: 3rem;
  margin-left: 2rem;
  font-weight: bold;
`;

const FormContainer = styled.div`
  display: flex;
  width: 70vw;
  margin: auto;
  margin-top: 1.5rem;
  background-color: #f1d00a;
  border-radius: 2rem;
  height: auto;
`;

const PurchaseBox = styled.input`
  display: flex;
  background-color: #f1d00a;
  opacity: 0.85;
  border-radius: 2rem;
  width: 45vw;
  height: 4vh;
  margin: auto;
  padding: 1rem 0 1rem 1rem;
  border-style: none;
  &:focus {
    outline: none;
  }
  font-size: 1.5rem;
`;

const PurchaseConfirm = styled.button`
  color: black;
  font-weight: bold;
  align-self: center;
  border: none;
  background: none;
  padding: 0.5rem;
  width: 5rem;
  white-space: nowrap;
  font-size: 1rem;
  cursor: pointer;
`;

const TotalAmountBox = styled.div`
  display: flex;
  justify-content: flex-end;
  color: white;
  /* background-color: coral; */
  width: 70vw;
  font-size: 1.5rem;
  height: auto;
  margin: auto;
  margin-top: 1rem;
`;

const NumberBox = styled.div`
  background-color: #f1d00a;
  width: 100vw;
  height: 40vh;
  display: flex;
  position: fixed;
  bottom: 2rem;
  margin: auto;
  border-radius: 1rem;
  justify-content: space-around;
  flex-direction: column;
  z-index: 3;
`;
const ThreeNumberBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`;

const LastNumberBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const NumberEach = styled.button`
  font-size: 2rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0);
  border: 0rem;
  cursor: pointer;
`;

const TextEach = styled.button`
  font-size: 1rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0);
  border: 0rem;
  margin-left: -1rem;
  margin-right: -1rem;
`;

const ReserveLine1 = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 90vw;
  height: 6vh;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ReserveLine2 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: auto;
  width: 85vw;
  height: 3vh;
  font-size: 1.1rem;
  font-weight: bold;
`;

const ReserveLine3 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: auto;
  width: 85vw;
  height: 3vh;
  font-size: 1.1rem;
  font-weight: bold;
`;

const ReserveLine4 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: auto;
  width: 85vw;
  height: 3vh;
  font-size: 1.1rem;
  font-weight: bold;
`;

const ReserveLine5 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  margin: auto;
  margin-bottom: 1.5rem;
  width: 90vw;
  height: 6vh;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ReserveCancleBtn = styled.button`
  width: 9rem;
  height: 2.5rem;
  background-color: #b6b6b6;
  border-style: none;
  border-radius: 0.5rem;
  font-weight: bolder;
  font-size: 1rem;
  color: #2b50f6;
  cursor: pointer;
`;

const ReserveConfirmBtn = styled.button`
  width: 9rem;
  height: 2.5rem;
  background-color: #2b50f6;
  border-style: none;
  border-radius: 0.5rem;
  font-weight: bolder;
  font-size: 1rem;
  color: white;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 검은색으로 반투명
  z-index: 1; // 다른 요소들보다 위에 위치
  display: ${(props) =>
    props.active ? "block" : "none"}; // active 상태에 따라 표시
`;

const BuyPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [active, setActive] = useState(0);
  const [TotalAmountStockPrice, setTotalAmountStockPrice] = useState(0);
  const [stockPrice, setStockPrice] = useState(0);
  
  const addDigit = (digit) => {
    setInputValue((prevValue) => {
      const newValue = prevValue + digit;
      setTotalAmountStockPrice(newValue * stockPrice); // Update the total amount when input changes
      return newValue;
    });
  };

  const removeDigit = () => {
    setInputValue((prevValue) => {
      const newValue = prevValue.slice(0, -1);
      setTotalAmountStockPrice(newValue * stockPrice); // Update the total amount when input changes
      return newValue;
    });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setTotalAmountStockPrice(event.target.value * stockPrice); // Update the total amount when input changes
  };

  const TotalAmountStockPriceDisplay =
    TotalAmountStockPrice.toLocaleString("ko-KR");

  const [confirmation, setConfirmation] = useState(false); // New state for the confirmation message

  const handleConfirmClick = () => {
    setActive(0);
    setConfirmation(true); // Set the confirmation to true when the confirm button is clicked
  };

  const navigate = useNavigate();

  const 예약구매버튼 = async () => {
    try {
      const response = await axios.post(
        "https://stalksound.store/sonification/buy/",
        {
          stock_symbol: StockID2,
          quantity: parseInt(inputValue)
        }
      );
    
      if (parseInt((response.status)/100) === 2) {
        navigate("/buy/confirm");
      } else {
        // 에러 상황 처리
      }
    } catch (error) {
      alert("매수 중 오류 발생!\n사유: " + error.response.data.error);
      // 에러 상황 처리
    }
  };
  const { StockID2 } = useParams();
  const stock = stockList.find((item) => item.code === StockID2);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stalksound.store/sonification/now_data/",
          {
            params: {
              symbol: StockID2,
            },
          }
        );
        setStockData(Number(response.data.chart_data.현재가));
        setStockPrice(response.data.chart_data.현재가);
      } catch (error) {
        console.error("종목명 가져오기 실패 ", error);
      }
    };

    fetchData();
  }, [StockID2]);

  const nowPrice = stockData.toLocaleString("ko-KR"); //세자리수마다 콤마찍기
  return (
    <>
      <TopBar></TopBar>
      <StockName>{stock.prdt_name}</StockName>
      <PriceBox>
        <PriceBoxLeft>구매할 가격</PriceBoxLeft>
        <PriceBoxRight>{nowPrice}원</PriceBoxRight>
      </PriceBox>
      <PurchastText>몇 주를 구매할까요?</PurchastText>
      <FormContainer>
        <PurchaseBox
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setActive(1)}
        ></PurchaseBox>
        <PurchaseConfirm onClick={handleConfirmClick}>확인</PurchaseConfirm>
      </FormContainer>
      <TotalAmountBox>총 {TotalAmountStockPriceDisplay}원</TotalAmountBox>
      {active === 1 && (
        <NumberBox>
          <ThreeNumberBox>
            <NumberEach onClick={() => addDigit(1)}>1</NumberEach>
            <NumberEach onClick={() => addDigit(2)}>2</NumberEach>
            <NumberEach onClick={() => addDigit(3)}>3</NumberEach>
          </ThreeNumberBox>
          <ThreeNumberBox>
            <NumberEach onClick={() => addDigit(4)}>4</NumberEach>
            <NumberEach onClick={() => addDigit(5)}>5</NumberEach>
            <NumberEach onClick={() => addDigit(6)}>6</NumberEach>
          </ThreeNumberBox>
          <ThreeNumberBox>
            <NumberEach onClick={() => addDigit(7)}>7</NumberEach>
            <NumberEach onClick={() => addDigit(8)}>8</NumberEach>
            <NumberEach onClick={() => addDigit(9)}>9</NumberEach>
          </ThreeNumberBox>
          <LastNumberBox>
            <TextEach
              onClick={() => {
                setInputValue("");
                setTotalAmountStockPrice(0);
              }}
            >
              전체삭제
            </TextEach>
            <NumberEach onClick={() => addDigit(0)}>0</NumberEach>
            <NumberEach onClick={() => removeDigit()}>⬅</NumberEach>
          </LastNumberBox>
        </NumberBox>
      )}

      <Overlay active={confirmation}></Overlay>
      {confirmation && (
        <NumberBox>
          <ReserveLine1> {stock.prdt_name} {inputValue}주 구매 예약</ReserveLine1>
          <ReserveLine2>
            <div> 1주 희망 가격 </div> <div> {nowPrice}원</div>
          </ReserveLine2>
          <ReserveLine3>
            <div> 예상 수수료 </div> <div> {}0원</div>
          </ReserveLine3>
          <ReserveLine4>
            <div> 총 주문 금액 </div>{" "}
            <div> {TotalAmountStockPriceDisplay}원</div>
          </ReserveLine4>
          <ReserveLine5>
            <div>
              {" "}
              <ReserveCancleBtn
                onClick={() => {
                  setActive(1);
                  setConfirmation(false);
                }}
              >
                취소
              </ReserveCancleBtn>{" "}
            </div>{" "}
            <div>
              {" "}
              <ReserveConfirmBtn onClick={예약구매버튼}>
                확인
              </ReserveConfirmBtn>{" "}
            </div>
          </ReserveLine5>
        </NumberBox>
      )}
      <BottomBar></BottomBar>
    </>
  );
};

export default BuyPage;
