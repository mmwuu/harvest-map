import React from 'react';
import { Leaf, Search } from 'lucide-react';

export default function Header() {
    return (
        <header className="header container">
            <div style={{ display:'flex', alignItems:'center' }}>
                <Leaf style={{ color:'#28a745', marginRight:8 }} />
                <span style={{ fontSize:24, fontWeight:'bold', color:'#28a745' }}>
          FarmerFinder
        </span>
            </div>
            <div className="search-bar">
                <button>Anywhere</button>
                <button>Any Produce</button>
                <button>Add Dates</button>
                <button className="icon-btn">
                    <Search />
                </button>
            </div>
            {/* 省略用户菜单按钮 */}
        </header>
    );
}
