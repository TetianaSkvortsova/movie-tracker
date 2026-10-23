import './App.css'
import {Input, Layout, Menu} from 'antd'
import {SearchOutlined} from "@ant-design/icons";

const {Header, Content} = Layout;

function App() {

    return (
        <>
            <Layout className="min-h-screen bg-slate-950">
                <Header className="bg-slate-900 border-b border-slate-800 px-8 sticky top-0 z-50">
                    <div className="flex justify-between items-center w-full h-full max-w-7xl mx-auto">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2 text-white font-bold text-lg pr-[15px]">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor"
                                     strokeWidth="2"
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="w-6 h-6 text-red-600"
                                     aria-hidden="true">
                                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                    <path d="M7 3v18"></path>
                                    <path d="M3 7.5h4"></path>
                                    <path d="M3 12h18"></path>
                                    <path d="M3 16.5h4"></path>
                                    <path d="M17 3v18"></path>
                                    <path d="M17 7.5h4"></path>
                                    <path d="M17 16.5h4"></path>
                                </svg>
                                <span
                                    className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-red-500 bg-clip-text text-transparent">
                                    MovieTracker
                                </span>
                            </div>
                            <Menu
                                mode="horizontal"
                                disabledOverflow={true}
                                style={{borderBottom: 'none', background: 'transparent'}}
                                className="min-w-[300px] font-medium"
                                defaultSelectedKeys={['catalog']}
                                items={[
                                    {key: 'catalog', label: 'Каталог'},
                                    {key: 'my-list', label: 'Мії списки'},
                                ]}
                            />
                        </div>
                        <Input
                            placeholder="Пошук фільмів..."
                            prefix={<SearchOutlined className="text-slate-400 mr-1" />}
                            allowClear
                            size="middle"
                            className="!rounded-full !w-64 !h-9"
                        />
                    </div>
                </Header>
                <Content className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8>Content">Content</Content>
            </Layout>
        </>
    )
}

export default App
