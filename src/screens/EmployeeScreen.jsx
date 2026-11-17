import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  ShieldCheck, 
  QrCode, 
  Sparkles, 
  Check, 
  CreditCard,
  Building,
  Wifi
} from 'lucide-react';
import { EMPLOYEES_LIST, CURRENT_USER } from '../data/mockData';

export default function EmployeeScreen({ user = CURRENT_USER }) {
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'idcard'
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [nfcTapped, setNfcTapped] = useState(false);

  const departments = ['All', 'Engineering', 'Design System', 'Cloud & Infrastructure', 'Mobile Experience', 'Security Operations'];

  const filteredEmployees = EMPLOYEES_LIST.filter(emp => {
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
                          emp.role.toLowerCase().includes(search.toLowerCase()) ||
                          emp.id.includes(search);
    return matchesDept && matchesSearch;
  });

  const handleNfcTap = () => {
    setNfcTapped(true);
    setTimeout(() => setNfcTapped(false), 2000);
  };

  return (
    <div className="w-full flex-1 flex flex-col px-5 py-4 bg-[#FCFCFD] text-[#252D3C] overflow-y-auto no-scrollbar pb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#252D3C]">
            Team & Employee ID
          </h1>
          <p className="text-xs text-[#5D6676]">
            Company directory & digital pass
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-0.5 bg-[#F4F3FF] rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'directory' ? 'bg-white text-[#6938EF] shadow-xs' : 'text-[#777F8C]'
            }`}
          >
            Team
          </button>
          <button
            onClick={() => setActiveTab('idcard')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'idcard' ? 'bg-white text-[#6938EF] shadow-xs' : 'text-[#777F8C]'
            }`}
          >
            My ID Card
          </button>
        </div>
      </div>

      {activeTab === 'directory' ? (
        <>
          {/* Search bar */}
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777F8C]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, or ID #..."
              className="w-full h-11 pl-10 pr-4 bg-white border border-[#EBECEE] rounded-xl text-xs text-[#252D3C] placeholder-[#777F8C] focus:outline-none focus:ring-2 focus:ring-[#6938EF]/20 focus:border-[#6938EF]"
            />
          </div>

          {/* Department pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-full text-xs shrink-0 transition-all ${
                  selectedDept === dept
                    ? 'bg-[#6938EF] text-white font-semibold shadow-xs'
                    : 'bg-white text-[#5D6676] border border-[#EBECEE] hover:border-[#6938EF]/30'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Employees List */}
          <div className="space-y-3">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                className="p-3.5 bg-white border border-[#EBECEE] rounded-2xl flex items-center justify-between shadow-xs hover:border-[#6938EF]/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-[#F4F3FF]"
                    />
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                      emp.status === 'Online' ? 'bg-[#19B36E]' : emp.status === 'In Meeting' ? 'bg-[#FFAD42]' : 'bg-[#C0C4CA]'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#252D3C]">{emp.name}</h4>
                      <span className="text-[10px] text-[#6938EF] bg-[#EBE9FE] px-1.5 py-0.2 rounded font-mono font-semibold">
                        #{emp.id}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5D6676] mt-0.5">{emp.role}</p>
                    <p className="text-[10px] text-[#777F8C]">{emp.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${emp.email}`}
                    className="w-8 h-8 rounded-full bg-[#F4F3FF] text-[#6938EF] flex items-center justify-center hover:bg-[#EBE9FE] transition-colors"
                    title={`Email ${emp.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`tel:${emp.phone}`}
                    className="w-8 h-8 rounded-full bg-[#F4F3FF] text-[#6938EF] flex items-center justify-center hover:bg-[#EBE9FE] transition-colors"
                    title={`Call ${emp.name}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Digital Employee ID Card (Badge / NFC) */
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xs bg-gradient-to-br from-[#252D3C] to-[#18181B] rounded-3xl p-5 text-white shadow-2xl relative overflow-hidden border border-white/10">
            {/* Holographic shimmer */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#6938EF]/30 rounded-full blur-2xl pointer-events-none" />
            
            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#6938EF] flex items-center justify-center font-bold text-white text-xs">
                  WM
                </div>
                <div>
                  <h4 className="text-xs font-extrabold tracking-wider uppercase text-white">Workmate Corp</h4>
                  <p className="text-[9px] text-[#D9D6FE]">Global Identity Badge</p>
                </div>
              </div>
              <Wifi className="w-5 h-5 text-amber-300 rotate-90" />
            </div>

            {/* Photo & Identity */}
            <div className="flex flex-col items-center my-5 text-center">
              <div className="relative mb-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#6938EF]/40 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 p-1 bg-[#19B36E] rounded-full text-white ring-2 ring-[#18181B]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
              
              <h3 className="text-base font-bold text-white">{user.name}</h3>
              <p className="text-xs text-[#D9D6FE] font-medium mt-0.5">{user.role}</p>
              
              <div className="inline-block mt-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[11px] font-mono font-bold tracking-widest text-amber-300 border border-white/15">
                ID: #{user.id}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-2 text-[10px] pt-3 border-t border-white/10">
              <div>
                <span className="text-white/60 block">DEPARTMENT</span>
                <span className="font-semibold text-white">Engineering</span>
              </div>
              <div>
                <span className="text-white/60 block">SECURITY CLEARANCE</span>
                <span className="font-semibold text-[#19B36E]">Level 3 (HQ Floor 8)</span>
              </div>
            </div>

            {/* Simulated Barcode */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col items-center">
              <div className="h-6 w-full flex justify-between items-center px-2 opacity-80">
                {[...Array(32)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white h-full"
                    style={{ width: i % 3 === 0 ? '3px' : i % 2 === 0 ? '1.5px' : '1px' }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono tracking-widest text-white/50 mt-1">
                WM-98124-SEC-AUTH
              </span>
            </div>
          </div>

          {/* Interactive Tap NFC Button */}
          <button
            onClick={handleNfcTap}
            className={`w-full max-w-xs mt-4 h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              nfcTapped 
                ? 'bg-[#19B36E] text-white shadow-lg shadow-[#19B36E]/20' 
                : 'bg-[#6938EF] hover:bg-[#5925DC] text-white shadow-lg shadow-[#6938EF]/20'
            }`}
          >
            {nfcTapped ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>NFC Verified at Turnstile Gate A</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 rotate-90" />
                <span>Simulate NFC Tap at Gate</span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
}
