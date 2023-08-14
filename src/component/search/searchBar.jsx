import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NaverIcon from "./NaverIcon.png";

library.add(faMagnifyingGlass);

function isUSStock(code) {
  const usStockCodes = [
    "AMRS", "WE", "MWWC", "HMBL", "PTRA", "ZRFY", "TSLA", "MIMO", "CANO",
    "DRNG", "EBET", "INND", "HCMC", "PHIL", "RGTI", "SFLM", "TTOO", "F",
    "GNS", "BBRW", "PLTR", "AMD", "NIO", "NKLA", "NVDA", "AAPL", "IONQ",
    "BBD", "BDPT", "CBDD", "MULN", "GAXY", "IDEX", "KVUE", "JNJ", "SANP",
    "AMZN", "ACHR", "DVLP", "BAC", "CCTR", "MMEX", "T", "RIVN", "AITX",
    "MPW", "NOUV", "INTC", "PGY", "PLUG", "TSOI", "VALE", "SOFI", "LCID",
    "FFIE", "CCL", "TIVC", "INQD", "EPAZ", "BABA", "AMC", "BOMO", "GOEV",
    "IJJP", "TSAT", "MSFT", "MARA", "DIS", "TLRY", "DKNG", "MCOA", "CGC",
    "GM", "LYFT", "DNA", "GOOGL", "COWI", "MRNJ", "PENN", "PBR", "PCG",
    "SWN", "ORGN", "SPCE", "RIOT", "GRAB", "CRKN", "OXY", "PFE", "GZIC",
    "UBER", "NSAV", "TWOH", "IGPK", "AAL", "APLS", "CLSK", "RIG", "LUMN",
    "ETON",

  ];

  return usStockCodes.includes(code);
}

//axios 연결 시 받을 주식 리스트 예시
const stockList = [
  { prdt_name: "삼성전자우", code: "005935" },
  { prdt_name: "삼성전자", code: "005930" },
  { prdt_name: "LG엔솔", code: "373220" },
  { prdt_name: "SK하이닉스", code: "000660" },
  { prdt_name: "LG 화학", code: "051915" },
  { prdt_name: "삼성바이오로직스", code: "207940" },
  { prdt_name: "현대차3우B", code: "005389" },
  { prdt_name: "현대차우", code: "005385" },
  { prdt_name: "현대차2우B", code: "005387" },
  { prdt_name: "LG화학", code: "051910" },
  { prdt_name: "POSCO홀딩스", code: "005490" },
  { prdt_name: "삼성SDI우", code: "006405" },
  { prdt_name: "삼성SDI", code: "006400" },
  { prdt_name: "현대차", code: "005380" },
  { prdt_name: "에코프로비엠", code: "247540" },
  { prdt_name: "포스코퓨처엠", code: "003670" },
  { prdt_name: "NAVER", code: "035420" },
  { prdt_name: "기아", code: "000270" },
  { prdt_name: "에코프로", code: "086520" },
  { prdt_name: "삼성물산우B", code: "02826K" },
  { prdt_name: "LG전자우", code: "066575" },
  { prdt_name: "LG생활건강우", code: "051905" },
  { prdt_name: "카카오", code: "035720" },
  { prdt_name: "SK이노우", code: "096775" },
  { prdt_name: "현대모비스", code: "012330" },
  { prdt_name: "셀트리온", code: "068270" },
  { prdt_name: "KB금융", code: "105560" },
  { prdt_name: "SK우", code: "03473K" },
  { prdt_name: "신한지주", code: "055550" },
  { prdt_name: "LG전자", code: "066570" },
  { prdt_name: "SK이노베이션", code: "096770" },
  { prdt_name: "삼성물산", code: "028260" },
  { prdt_name: "LG우", code: "003555" },
  { prdt_name: "포스코인터내셔널", code: "047050" },
  { prdt_name: "삼성전기우", code: "009155" },
  { prdt_name: "카카오뱅크", code: "323410" },
  { prdt_name: "아모레퍼시픽우", code: "090435" },
  { prdt_name: "LG", code: "003550" },
  { prdt_name: "삼성생명", code: "032830" },
  { prdt_name: "한국전력", code: "015760" },
  { prdt_name: "현대중공업", code: "329180" },
  { prdt_name: "하나금융지주", code: "086790" },
  { prdt_name: "삼성전기", code: "009150" },
  { prdt_name: "S-Oil우", code: "010955" },
  { prdt_name: "두산에너빌리티", code: "034020" },
  { prdt_name: "삼성화재 우선주", code: "000815" },
  { prdt_name: "셀트리온헬스케어", code: "091990" },
  { prdt_name: "삼성SDS", code: "018260" },
  { prdt_name: "한화오션", code: "042660" },
  { prdt_name: "하이브", code: "352820" },
  { prdt_name: "대한항공우", code: "003495" },
  { prdt_name: "SK텔레콤", code: "017670" },
  { prdt_name: "삼성화재", code: "000810" },
  { prdt_name: "고려아연", code: "010130" },
  { prdt_name: "KT&G", code: "033780" },
  { prdt_name: "메리츠금융지주", code: "138040" },
  { prdt_name: "대한항공", code: "003490" },
  { prdt_name: "HD한국조선해양", code: "009540" },
  { prdt_name: "S-oil", code: "010950" },
  { prdt_name: "HMM", code: "011200" },
  { prdt_name: "SK그룹", code: "034730" },
  { prdt_name: "우리금융지주", code: "316140" },
  { prdt_name: "금양", code: "001570" },
  { prdt_name: "기업은행", code: "024110" },
  { prdt_name: "엘앤에프", code: "066970" },
  { prdt_name: "크래프톤", code: "259960" },
  { prdt_name: "삼성중공업", code: "010140" },
  { prdt_name: "KT", code: "030200" },
  { prdt_name: "SKIET", code: "361610" },
  { prdt_name: "CJ제일우", code: "097955" },
  { prdt_name: "한화케미칼우", code: "009835" },
  { prdt_name: "카카오페이", code: "377300" },
  { prdt_name: "삼성엔지니어링", code: "028050" },
  { prdt_name: "SK 바이오팜", code: "326030" },
  { prdt_name: "아모레퍼시픽", code: "090430" },
  { prdt_name: "LG생활건강", code: "051900" },
  { prdt_name: "롯데케미칼", code: "011170" },
  { prdt_name: "한화솔루션", code: "009830" },
  { prdt_name: "금호석유우", code: "011785" },
  { prdt_name: "현대글로비스", code: "086280" },
  { prdt_name: "미래에셋우", code: "006805" },
  { prdt_name: "미래에셋대우2우b", code: "00680K" },
  { prdt_name: "LG이노텍", code: "011070" },
  { prdt_name: "한화에어로스페이스", code: "012450" },
  { prdt_name: "SK스퀘어", code: "402340" },
  { prdt_name: "현대건설우", code: "000725" },
  { prdt_name: "SK바사", code: "302440" },
  { prdt_name: "한국금융우", code: "071055" },
  { prdt_name: "엔씨소프트", code: "036570" },
  { prdt_name: "두산밥캣", code: "241560" },
  { prdt_name: "코스모신소재", code: "005070" },
  { prdt_name: "유한양행", code: "000100" },
  { prdt_name: "포스코DX", code: "022100" },
  { prdt_name: "아모레G우", code: "002795" },
  { prdt_name: "한미반도체", code: "042700" },
  { prdt_name: "LG디스플레이", code: "034220" },
  { prdt_name: "한국타이어앤테크놀로지", code: "161390" },
  { prdt_name: "맥쿼리인프라", code: "088980" },
  { prdt_name: "현대제철", code: "004020" },
  { prdt_name: "한국항공우주", code: "047810" },
  
  //미국 주식 추가
  { prdt_name: "아미리스", code: "AMRS" },
  { prdt_name: "WeWork", code: "WE" },
  { prdt_name: "Marketing Worldwide", code: "MWWC" },
  { prdt_name: "Humbl", code: "HMBL" },
  { prdt_name: "Proterra", code: "PTRA" },
  { prdt_name: "Zerify", code: "ZRFY" },
  { prdt_name: "테슬라", code: "TSLA" },
  { prdt_name: "Airspan Networks Holdings", code: "MIMO" },
  { prdt_name: "Cano Health", code: "CANO" },
  { prdt_name: "Drone Guarder", code: "DRNG" },
  { prdt_name: "Ebet Inc", code: "EBET" },
  { prdt_name: "Innerscope Advertising", code: "INND" },
  { prdt_name: "Healthier Choices Management", code: "HCMC" },
  { prdt_name: "PHI Group", code: "PHIL" },
  { prdt_name: "Rigetti Computing", code: "RGTI" },
  { prdt_name: "SFLMaven", code: "SFLM" },
  { prdt_name: "T2 Biosystms Inc", code: "TTOO" },
  { prdt_name: "포드", code: "F" },
  { prdt_name: "Genius", code: "GNS" },
  { prdt_name: "Brewbilt Manufacturing Inc", code: "BBRW" },
  { prdt_name: "팔란티어 테크", code: "PLTR" },
  { prdt_name: "AMD", code: "AMD" },
  { prdt_name: "니오 ADR A", code: "NIO" },
  { prdt_name: "니콜라", code: "NKLA" },
  { prdt_name: "엔비디아", code: "NVDA" },
  { prdt_name: "애플", code: "AAPL" },
  { prdt_name: "IONQ", code: "IONQ" },
  { prdt_name: "브라데스코", code: "BBD" },
  { prdt_name: "BioAdaptives", code: "BDPT" },
  { prdt_name: "Cbd Denver", code: "CBDD" },
  { prdt_name: "멀른 오토모티브", code: "MULN" },
  { prdt_name: "Galaxy Next", code: "GAXY" },
  { prdt_name: "아이디어노믹스", code: "IDEX" },
  { prdt_name: "Kenvue", code: "KVUE" },
  { prdt_name: "존슨앤존슨", code: "JNJ" },
  { prdt_name: "Santo Mining Corp", code: "SANP" },
  { prdt_name: "아마존닷컴", code: "AMZN" },
  { prdt_name: "Archer Aviation", code: "ACHR" },
  { prdt_name: "Golden Develop", code: "DVLP" },
  { prdt_name: "뱅크오브아메리카", code: "BAC" },
  { prdt_name: "China Crescent", code: "CCTR" },
  { prdt_name: "MMEX Resources", code: "MMEX" },
  { prdt_name: "AT&T", code: "T" },
  { prdt_name: "리비안", code: "RIVN" },
  { prdt_name: "Artificial Intelligence Tech", code: "AITX" },
  { prdt_name: "Medical Prop Tr", code: "MPW" },
  { prdt_name: "Nouveau Life Pharma", code: "NOUV" },
  { prdt_name: "인텔", code: "INTC" },
  { prdt_name: "Pagaya", code: "PGY" },
  { prdt_name: "플러그파워", code: "PLUG" },
  { prdt_name: "Therapeutic Solutions", code: "TSOI" },
  { prdt_name: "발레 SA ADR", code: "VALE" },
  { prdt_name: "SoFi Technologies", code: "SOFI" },
  { prdt_name: "루시드", code: "LCID" },
  { prdt_name: "Faraday Future Intelligent Electric", code: "FFIE" },
  { prdt_name: "카니발", code: "CCL" },
  { prdt_name: "Tivic Health Systems", code: "TIVC" },
  { prdt_name: "Indoor Harvest", code: "INQD" },
  { prdt_name: "Auto Dataflow", code: "EPAZ" },
  { prdt_name: "알리바바 ADR", code: "BABA" },
  { prdt_name: "AMC 엔터", code: "AMC" },
  { prdt_name: "bowmo", code: "BOMO" },
  { prdt_name: "카누", code: "GOEV" },
  { prdt_name: "Ijj Corporation", code: "IJJP" },
  { prdt_name: "Telesat", code: "TSAT" },
  { prdt_name: "마이크로소프트", code: "MSFT" },
  { prdt_name: "마라톤 디지털", code: "MARA" },
  { prdt_name: "월트 디즈니", code: "DIS" },
  { prdt_name: "Tilray", code: "TLRY" },
  { prdt_name: "드래프트킹스", code: "DKNG" },
  { prdt_name: "Marijuana America", code: "MCOA" },
  { prdt_name: "Canopy Growth", code: "CGC" },
  { prdt_name: "제너럴 모터스", code: "GM" },
  { prdt_name: "LYFT", code: "LYFT" },
  { prdt_name: "Ginkgo Bioworks", code: "DNA" },
  { prdt_name: "알파벳 A", code: "GOOGL" },
  { prdt_name: "CarbonMeta Tech", code: "COWI" },
  { prdt_name: "Metatron", code: "MRNJ" },
  { prdt_name: "펜 엔터테인먼트", code: "PENN" },
  { prdt_name: "페트로브라스", code: "PBR" },
  { prdt_name: "PG E", code: "PCG" },
  { prdt_name: "사우스웨스턴 에너지", code: "SWN" },
  { prdt_name: "Origin Materials", code: "ORGN" },
  { prdt_name: "Virgin Galactic Holdings", code: "SPCE" },
  { prdt_name: "Riot Platforms", code: "RIOT" },
  { prdt_name: "그랩", code: "GRAB" },
  { prdt_name: "Crown Electrokinetics", code: "CRKN" },
  { prdt_name: "옥시덴탈", code: "OXY" },
  { prdt_name: "화이자", code: "PFE" },
  { prdt_name: "GZ6G Tech", code: "GZIC" },
  { prdt_name: "우버 테크놀로지스", code: "UBER" },
  { prdt_name: "Net Savings Link", code: "NSAV" },
  { prdt_name: "Two Hands", code: "TWOH" },
  { prdt_name: "Integrated Cannabis Solutions", code: "IGPK" },
  { prdt_name: "아메리칸항공그룹", code: "AAL" },
  { prdt_name: "아펠리스", code: "APLS" },
  { prdt_name: "CleanSpark", code: "CLSK" },
  { prdt_name: "트랜스오션", code: "RIG" },
  { prdt_name: "루멘 테크놀로지스", code: "LUMN" },
  { prdt_name: "Eton Pharmaceuticals", code: "ETON" }
];


const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  z-index: 2;
  position: absolute;
  color: gray;
  top: 2.8rem;
  left: 0.6rem;
  pointer-events: none; /* This prevents the icon from blocking the input field */
`;

const SearchSmallContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  border: 0;
  background-color: var(--gray, #f9f9f9);
  width: 75vw;
  height: 1.5rem;
  border-radius: 12px;
  padding: 0.625rem 1rem 0.625rem 2rem;
  margin-top: 2rem;
  z-index: 1;
`;

const AutoSearchContainer = styled.div`
  position: absolute;
  border: none;
  top: 5rem;
  /* left: 2rem; */
  width: 85vw;
`;

const AutoSearchData = styled.p`
  margin: 0%;
  padding-left: 2.5rem;
  width: inherit;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const EachDataDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const EachStockDataDiv = styled.div`
  position: relative;
  z-index: 1000;
`;

const EachStockData = styled.p`
  font-size: 12px;
  color: gray;
  margin: 0;
  padding-left: 2.5rem;
`;

const EachStockIcon = styled.img`
  position: absolute;
  width: 1.875rem;
  border-radius: 50%;
`;

const EachPercentDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StockPrice = styled.p`
  margin: 0;
  font-size: 12px;
  margin-left: auto;
  color: white;
  font-weight: bold;
`;

const PercentData = styled.p`
  margin: 0;
  font-size: 12px;
  margin-left: auto;
  color: red; //조건 줘서 올라갈 경우 red, 내려갈 경우 blue로 보이게 설정하기
`;

const RecentSearch = styled.p`
  color: white;
  font-weight: bold;
  margin: 0;
  padding-top: 1rem;
`;

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearchData, setRecentSearch] = useState([]);
  const [recentAxios, setRecentAxios] = useState();

  const addToSearchHistory = (item) => {
    let newSearchArray = [...recentSearchData];

    if (newSearchArray.length >= 5) {
      newSearchArray.pop();
    }

    if (!newSearchArray.includes(item)) {
      newSearchArray.unshift(item);
      setRecentSearch(newSearchArray);
      localStorage.setItem("recent", JSON.stringify(newSearchArray));
    }
  };

  function handleInputSearch(e) {
    const { value } = e.target;
    setQuery(value);
    const SearchSuggestions = getSuggestions(value);
    setSuggestions(SearchSuggestions);
    setShowSuggestions(true);
  }

  const getSuggestions = (value) => {
    const filteredSuggestions = stockList.filter((item) =>
      item.prdt_name.includes(value)
    );
    return filteredSuggestions;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputSearch(e);
    }
  };

  useEffect(() => {
    const recentSearchDataString = localStorage.getItem("recent");

    if (!recentSearchDataString) {
      setRecentSearch([]);
    } else {
      setRecentSearch(JSON.parse(recentSearchDataString));
    }
  }, []);

  useEffect(() => {
    const recentArray = JSON.parse(localStorage.getItem("recent"));
    let filteredArray = [];

    if (
      recentArray &&
      Array.isArray(recentArray) &&
      recentArray.length > 0
    ) {
      filteredArray = recentArray
        .filter((item) => item !== null && item !== undefined)
        .filter((item) =>
          stockList.some((obj) => obj.prdt_name === item)
        );
    }

    let foundObjects = stockList.filter((item) =>
      filteredArray.includes(item.prdt_name)
    );

    const axiosRequests = foundObjects.map((recentData) => {
      return axios.get(`https://stalksound.store/sonification/now_data/`, {
        params: {
          symbol: "005930",
        },
      });
    });

    Promise.all(axiosRequests)
      .then((responses) => {
        const responseDataArray = responses.map((res) => res.data.chart_data);
        for (let i = 0; i < foundObjects.length; i++) {
          foundObjects[i].responseData = responseDataArray[i];
        }
        setRecentAxios(foundObjects);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <SearchContainer>
        <SearchSmallContainer>
          <SearchIcon icon={faMagnifyingGlass} />
          <SearchInput
            type="text"
            value={query}
            onChange={handleInputSearch}
            placeholder="검색하기"
            onKeyPress={handleKeyPress}
          />
        </SearchSmallContainer>
        {query.length > 0 && showSuggestions && (
          <AutoSearchContainer>
            {suggestions.map((result) => (
              <EachDataDiv
                onClick={() => {
                  if (isUSStock(result.code)) {
                    navigate(`/detail/inter/${result.code}`);
                  } else {
                    navigate(`/detail/${result.code}`);
                  }
                  addToSearchHistory(result.prdt_name);
                }}
              >
                <EachStockDataDiv>
                  <EachStockIcon src={NaverIcon} />
                  <AutoSearchData>{result.prdt_name}</AutoSearchData>
                  <EachStockData>주식 설명</EachStockData>
                </EachStockDataDiv>
                <EachPercentDataDiv>
                  <StockPrice>7500</StockPrice>
                  <PercentData>+500 (+5%)</PercentData>
                </EachPercentDataDiv>
              </EachDataDiv>
            ))}
          </AutoSearchContainer>
        )}
        {query.length === 0 && (
          <AutoSearchContainer>
            <RecentSearch>최근 검색 기록</RecentSearch>
            {recentSearchData !== null ? (
              recentSearchData.map((recent) => (
                <EachDataDiv
                  onClick={() => {
                    const selectedItem = stockList.find(
                      (item) => item.prdt_name === recent
                    );

                    if (selectedItem) {
                      const detailUrl = isUSStock(selectedItem.code)
                        ? `/detail/inter/${selectedItem.code}`
                        : `/detail/${selectedItem.code}`;

                      navigate(detailUrl);
                      addToSearchHistory(selectedItem.prdt_name);
                    }
                  }}
                >
                  <EachStockDataDiv>
                    <EachStockIcon src={NaverIcon} />
                    <AutoSearchData>{recent}</AutoSearchData>
                    <EachStockData>주식 설명</EachStockData>
                  </EachStockDataDiv>
                  <EachPercentDataDiv>
                    <StockPrice>7500</StockPrice>
                    <PercentData>500 (+5%)</PercentData>
                  </EachPercentDataDiv>
                </EachDataDiv>
              ))
            ) : (
              <RecentSearch>검색 기록이 없습니다.</RecentSearch>
            )}
          </AutoSearchContainer>
        )}
      </SearchContainer>
    </>
  );
};

export default SearchBar;
