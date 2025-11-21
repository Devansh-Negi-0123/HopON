export default function Analytics() {
    const cardStyle = {
        background: "white",
        borderRadius: ".75rem",
        boxShadow: "0 6px 18px rgba(10,10,10,0.06)"
    };

    return (
        <>
            <div className="h-[calc(100vh-4rem)] fixed right-0 w-full md:w-3/4 overflow-y-auto p-6 bg-gray-50 text-gray-800 antialiased">

                <header className="mb-6">
                    <h1 className="text-3xl font-semibold">Your Ride Analytics</h1>
                    <p className="text-sm text-gray-600 mt-1">A summary of your travel history and ride activity.</p>
                </header>

                {/* ==== SUMMARY CARDS ==== */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                    {/* Total Rides */}
                    <div className="card p-4" style={cardStyle}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">Total Rides</p>
                                <p className="text-2xl font-bold">48</p>
                            </div>
                            <div className="text-gray-400" aria-hidden="true">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        d="M3 13l2-2 4 4 6-6 4 4"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Distance Travelled */}
                    <div className="card p-4" style={cardStyle}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">Distance Travelled</p>
                                <p className="text-2xl font-bold">327 km</p>
                            </div>
                            <div className="text-gray-400">
                                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path
                                        d="M3 12h3l3 6 4-12 4 6h3"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Estimated Savings */}
                    <div className="card p-4" style={cardStyle}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">Estimated Savings</p>
                                <p className="text-2xl font-bold">₹1,240</p>
                            </div>
                            <div className="text-gray-400">
                                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path
                                        d="M12 8v4l3 3"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* CO2 Reduced */}
                    <div className="card p-4" style={cardStyle}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">CO₂ Reduced</p>
                                <p className="text-2xl font-bold">19.4 kg</p>
                            </div>
                            <div className="text-gray-400">
                                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path
                                        d="M12 2C7 7 5 10 5 13a7 7 0 0014 0c0-3-2-6-7-11z"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                </section>

                {/* ==== MONTHLY CHART ==== */}
                <section className="card p-5 mb-6" style={cardStyle}>
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h2 className="text-lg font-semibold">Monthly Ride Activity</h2>
                            <p className="text-sm text-gray-500">Rides per month (last 6 months)</p>
                        </div>
                        <div className="text-sm text-gray-500">
                            Total this period: <strong className="text-gray-900">28 rides</strong>
                        </div>
                    </div>

                    <div className="w-full">
                        <svg viewBox="0 0 600 160" className="w-full h-36" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#fef3f2" />
                                    <stop offset="100%" stopColor="#fff" />
                                </linearGradient>
                            </defs>

                            <rect x="0" y="0" width="600" height="160" fill="transparent"></rect>

                            <path
                                d="M0,120 L100,100 L200,80 L300,60 L400,70 L500,90 L600,110 L600,160 L0,160 Z"
                                fill="url(#g1)"
                                opacity="0.9"
                            />

                            <path
                                d="M0,120 L100,100 L200,80 L300,60 L400,70 L500,90 L600,110"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="3"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                />

                            <circle cx="0" cy="120" r="3.5" fill="#ef4444" />
                            <circle cx="100" cy="100" r="3.5" fill="#ef4444" />
                            <circle cx="200" cy="80" r="3.5" fill="#ef4444" />
                            <circle cx="300" cy="60" r="3.5" fill="#ef4444" />
                            <circle cx="400" cy="70" r="3.5" fill="#ef4444" />
                            <circle cx="500" cy="90" r="3.5" fill="#ef4444" />
                            <circle cx="600" cy="110" r="3.5" fill="#ef4444" />
                        </svg>

                        <div className="flex gap-4 items-center text-sm text-gray-500 mt-3">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Rides
                            </div>
                            <div className="text-xs">Jan — Jun</div>
                        </div>
                    </div>
                </section>

                {/* ==== SPENDING & SAVINGS ==== */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

                    {/* Spending */}
                    <div className="card p-4" style={cardStyle}>
                        <h3 className="font-semibold">Your Spending</h3>
                        <p className="text-sm text-gray-500 mb-3">Breakdown this month</p>

                        <div className="flex items-center gap-6">
                            <svg viewBox="0 0 36 36" className="w-28 h-28">
                                <path d="M18 2a16 16 0 1 0 0 32 16 16 0 1 0 0-32" fill="#f3f4f6" />
                                <path d="M18 18 L18 2 A16 16 0 0 1 30.4 7.6 Z" fill="#ef4444" />
                                <circle cx="18" cy="18" r="8" fill="white" />
                                <text x="18" y="20" fontSize="3" textAnchor="middle" fill="#111">₹480</text>
                            </svg>

                            <div>
                                <p className="text-sm text-gray-500">This month</p>
                                <p className="text-2xl font-bold">₹480</p>
                                <ul className="text-sm text-gray-600 mt-3 space-y-1">
                                    <li>Avg per ride: <strong>₹16</strong></li>
                                    <li>Rides this month: <strong>30</strong></li>
                                    <li>Payment method: <strong>Wallet</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Savings */}
                    <div className="card p-4" style={cardStyle}>
                        <h3 className="font-semibold">Your Savings</h3>
                        <p className="text-sm text-gray-500 mb-3">Estimated versus solo travel</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 rounded bg-green-50">
                                <p className="text-xs text-gray-500">Estimated saved</p>
                                <p className="text-xl font-bold">₹1,240</p>
                                <p className="text-xs text-gray-600 mt-2">~32% less than solo ride cost</p>
                            </div>
                            <div className="p-3 rounded bg-yellow-50">
                                <p className="text-xs text-gray-500">CO₂ reduced</p>
                                <p className="text-xl font-bold">19.4 kg</p>
                                <p className="text-xs text-gray-600 mt-2">Equivalent to planting ~1 tree</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==== ROUTES + RATINGS ==== */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

                    {/* Frequent Routes */}
                    <div className="card p-4 lg:col-span-2" style={cardStyle}>
                        <h3 className="font-semibold">Frequent Routes</h3>
                        <p className="text-sm text-gray-500 mb-3">Your top origin → destination pairs</p>

                        <ol className="space-y-3">
                            <li className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium">Home → College</div>
                                    <div className="text-xs text-gray-500">22 rides — avg distance 8 km</div>
                                </div>
                                <div className="text-sm text-gray-600">22</div>
                            </li>

                            <li className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium">Bus Stand → Office</div>
                                    <div className="text-xs text-gray-500">10 rides — avg distance 6 km</div>
                                </div>
                                <div className="text-sm text-gray-600">10</div>
                            </li>

                            <li className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium">Gym → Hostel</div>
                                    <div className="text-xs text-gray-500">5 rides — avg distance 3.5 km</div>
                                </div>
                                <div className="text-sm text-gray-600">5</div>
                            </li>
                        </ol>
                    </div>

                    {/* Ratings */}
                    <div className="card p-4" style={cardStyle}>
                        <h3 className="font-semibold">Your Ratings</h3>
                        <p className="text-sm text-gray-500 mb-3">Average rating as rider</p>

                        <div className="flex items-center gap-3">
                            <div className="text-3xl font-bold">4.7</div>
                            <div className="text-sm text-gray-500">/ 5 • 86 ratings</div>
                        </div>

                        <div className="mt-3 space-y-2 text-sm">

                            {/* 5 star */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 text-xs text-gray-600">5★</div>
                                <div className="flex-1 bg-gray-200 rounded h-3 overflow-hidden">
                                    <div style={{ width: "75%" }} className="h-full bg-yellow-400"></div>
                                </div>
                                <div className="w-10 text-right text-xs text-gray-600">75%</div>
                            </div>

                            {/* 4 star */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 text-xs text-gray-600">4★</div>
                                <div className="flex-1 bg-gray-200 rounded h-3 overflow-hidden">
                                    <div style={{ width: "15%" }} className="h-full bg-yellow-300"></div>
                                </div>
                                <div className="w-10 text-right text-xs text-gray-600">15%</div>
                            </div>

                            {/* 3 star */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 text-xs text-gray-600">3★</div>
                                <div className="flex-1 bg-gray-200 rounded h-3 overflow-hidden">
                                    <div style={{ width: "6%" }} className="h-full bg-yellow-200"></div>
                                </div>
                                <div className="w-10 text-right text-xs text-gray-600">6%</div>
                            </div>

                            {/* 1-2 star */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 text-xs text-gray-600">1-2★</div>
                                <div className="flex-1 bg-gray-200 rounded h-3 overflow-hidden">
                                    <div style={{ width: "4%" }} className="h-full bg-red-300"></div>
                                </div>
                                <div className="w-10 text-right text-xs text-gray-600">4%</div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ==== RECENT ACTIVITY ==== */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    {/* Table */}
                    <div className="card p-4 lg:col-span-2" style={cardStyle}>
                        <h3 className="font-semibold mb-3">Recent Activity</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="text-xs text-gray-500 uppercase">
                                    <tr>
                                        <th className="py-2 pr-4">Date</th>
                                        <th className="py-2 pr-4">Route</th>
                                        <th className="py-2 pr-4">Distance</th>
                                        <th className="py-2 pr-4">Cost</th>
                                        <th className="py-2 pr-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr>
                                        <td className="py-3 pr-4">12 Sep 2025</td>
                                        <td className="py-3 pr-4">Home → College</td>
                                        <td className="py-3 pr-4">8 km</td>
                                        <td className="py-3 pr-4">₹25</td>
                                        <td className="py-3 pr-4 text-green-600 font-medium">Completed</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 pr-4">10 Sep 2025</td>
                                        <td className="py-3 pr-4">Office → Mall</td>
                                        <td className="py-3 pr-4">5 km</td>
                                        <td className="py-3 pr-4">₹20</td>
                                        <td className="py-3 pr-4 text-green-600 font-medium">Completed</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 pr-4">09 Sep 2025</td>
                                        <td className="py-3 pr-4">Bus Stand → Office</td>
                                        <td className="py-3 pr-4">6 km</td>
                                        <td className="py-3 pr-4">₹22</td>
                                        <td className="py-3 pr-4 text-yellow-600 font-medium">Cancelled</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Insights */}
                    <aside className="card p-4" style={cardStyle}>
                        <h4 className="font-semibold">Insights</h4>
                        <ul className="mt-3 space-y-2 text-sm text-gray-600">
                            <li>• Most active day: <strong className="text-gray-800">Monday</strong></li>
                            <li>• Average commute time: <strong className="text-gray-800">14 minutes</strong></li>
                            <li>• Most frequent partner: <strong className="text-gray-800">Ankit Kumar (7 rides)</strong></li>
                            <li>• You're in the top <strong className="text-gray-800">12%</strong> of CO₂ savers on HopON</li>
                        </ul>
                    </aside>
                </section>

            </div>
        </>
    );
}
