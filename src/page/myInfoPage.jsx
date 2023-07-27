import React, { useState } from "react";
import styled from "styled-components";
import BottomBar from "../component/global/bottomBar";
import TopBar from "../component/global/topBar";
import MyInform from '../component/myinfo/myInform';
import MyAsset from "../component/myinfo/myAsset";

const MyInfoPage = () => {
    return (
        <>
        <TopBar></TopBar>
        <MyInform></MyInform>
        <MyAsset></MyAsset>
        <BottomBar></BottomBar>
        </>
    );
};

export default MyInfoPage;