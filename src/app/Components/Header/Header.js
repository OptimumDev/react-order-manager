import React from "react";
import './Header.css';
import Controls from "../Controls/Controls";
import {Tabs} from "@skbkontur/react-ui";
import * as PageNames from "../../Constants/PageNames";

export default function Header({currentPage, datesToCreate, onPageChange, onOrderCreate}) {
    return (
        <header className='app-header'>
            <div className='app-name-container'>
                <span className='app-name'>Order Manager</span>
            </div>
            <nav className='tabs'>
                <Tabs value={currentPage} onValueChange={onPageChange}>
                    <Tabs.Tab id={PageNames.CURRENT_ORDERS}>Текущие</Tabs.Tab>
                    <Tabs.Tab id={PageNames.DONE_ORDERS}>Выполненые</Tabs.Tab>
                </Tabs>
            </nav>
            <Controls datesToCreate={datesToCreate} onOrderCreate={onOrderCreate}/>
        </header>
    );
}
