import React, { useRef } from 'react';
import { Printer, X, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { RecruitmentApplicant, RecruitmentAnnouncementConfig, FormFieldConfig, RecruitmentSignatoriesConfig } from '../../types';
import { ASSETS } from '../../data/bnccData';
import { useAdminData } from '../../context/AdminDataContext';

interface RecruitmentApplicationSlipA4Props {
  applicant?: Partial<RecruitmentApplicant> | null;
  announcement?: RecruitmentAnnouncementConfig;
  formFields?: FormFieldConfig[];
  signatories?: RecruitmentSignatoriesConfig;
  isBlank?: boolean;
  onClose?: () => void;
}

export const RecruitmentApplicationSlipA4: React.FC<RecruitmentApplicationSlipA4Props> = ({
  applicant,
  announcement,
  signatories: propSignatories,
  isBlank = false,
  onClose,
}) => {
  const { recruitmentSignatories: contextSignatories, recruitmentAnnouncement } = useAdminData();
  const printRef = useRef<HTMLDivElement>(null);

  const activeAnnouncement = announcement || recruitmentAnnouncement;
  const sig = propSignatories || contextSignatories;

  const handlePrint = () => {
    window.print();
  };

  // Helper to format values or return dotted placeholders
  const val = (text?: string | null, placeholderDots = '........................................................................') => {
    if (isBlank || !text || text.trim() === '') {
      return <span className="font-mono text-gray-400 select-none">{placeholderDots}</span>;
    }
    return <span className="font-semibold text-black border-b border-black/60 pb-0.5 px-1">{text}</span>;
  };

  const isCheck = (target: string, current?: string) => {
    if (isBlank) return false;
    return current?.toLowerCase() === target.toLowerCase();
  };

  const appData = applicant || {};

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex flex-col items-center justify-start p-2 sm:p-6 print:p-0 print:bg-white print:static">
      {/* Floating Action Controls - Hidden during physical print */}
      <div className="sticky top-3 z-60 mb-4 flex items-center gap-3 print:hidden bg-[#1c1c18]/95 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20">
        <div className="flex items-center gap-2 pr-3 border-r border-white/20">
          <FileText className="w-5 h-5 text-[#eedc82]" />
          <span className="font-bold text-sm tracking-wide">
            {isBlank ? 'Blank Printable Application Form' : 'Official Recruit Admission Form'}
          </span>
        </div>

        <button
          id="btn-print-slip"
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#eedc82] hover:bg-[#ffe885] text-[#1c1c18] font-black px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save 2-Page A4 PDF</span>
        </button>

        {onClose && (
          <button
            id="btn-close-slip"
            onClick={onClose}
            className="p-2 text-[#cdc6b3] hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Printable Wrapper */}
      <div
        ref={printRef}
        id="official-recruitment-a4-document"
        className="w-full max-w-[210mm] text-[#1c1c18] font-sans text-[12px] leading-snug print:w-[210mm] print:max-w-none print:p-0"
      >
        {/* =========================================================================
            PAGE 1: PERSONAL & ACADEMIC PARTICULARS (Items 1 - 19)
            ========================================================================= */}
        <div
          className="bg-white p-8 sm:p-10 my-4 shadow-2xl rounded-sm border border-[#d8d2be] print:border-none print:shadow-none print:m-0 print:p-[12mm] print:rounded-none min-h-[297mm] flex flex-col justify-between"
          style={{
            pageBreakAfter: 'always',
            breakAfter: 'page',
            boxSizing: 'border-box',
          }}
        >
          <div>
            {/* Header: Logos & Platoon Titles */}
            <div className="relative border-b-2 border-black pb-3 mb-4">
              <div className="flex items-center justify-between gap-2">
                {/* Left Logo: BNCC */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
                  <img
                    src={ASSETS.bnccLogo}
                    alt="BNCC Emblem"
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Center Platoon Typography */}
                <div className="text-center flex-1 px-2">
                  <h1 className="text-base sm:text-lg font-black uppercase tracking-wide text-black">
                    Bangladesh National Cadet Corps (BNCC)
                  </h1>
                  <h2 className="text-xs sm:text-sm font-bold text-black mt-0.5">
                    31 BNCC Battalion, Mahasthan Regiment
                  </h2>
                  <h3 className="text-xs sm:text-sm font-bold text-black">
                    New Govt. Degree College, Rajshahi
                  </h3>
                  <div className="inline-block mt-2 px-4 py-0.5 border border-black rounded-sm bg-gray-50">
                    <span className="text-xs font-black uppercase tracking-widest text-black">
                      Recruit Admission Form
                    </span>
                  </div>
                </div>

                {/* Right Logo: NGDC Crest */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
                  <img
                    src={ASSETS.ngdcLogo}
                    alt="NGDC Crest"
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Sub-bar: Serial Number & Photo Attachment Box */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-black">
                  <span>Serial No:</span>
                  <span className="font-mono px-2 py-0.5 border border-black/80 bg-gray-50 rounded-xs">
                    {isBlank ? '....................................' : (appData.serialNo || appData.token || 'REC-2026-001')}
                  </span>
                </div>

                {/* 300 x 300 Photo Box */}
                <div className="absolute right-0 top-18 w-24 h-28 border-2 border-dashed border-black/80 bg-gray-50 flex flex-col items-center justify-center text-center p-1 overflow-hidden z-10">
                  {!isBlank && appData.avatarUrl ? (
                    <img
                      src={appData.avatarUrl}
                      alt={appData.fullName || 'Candidate Photo'}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-[9px] text-gray-500">
                      <span className="font-bold">Picture</span>
                      <span>300 x 300</span>
                      <span className="text-[7.5px] mt-1 text-gray-400 leading-tight">Attach or upload from website</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Fields: Items 1 to 19 */}
            <div className="space-y-2.5 text-[11.5px] text-black pr-28 sm:pr-30">
              {/* 1. Applicant's Name */}
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="font-bold w-48 shrink-0">1. Applicant's Name: *</span>
                  <span className="text-gray-700 mr-2 shrink-0">In Bangla:</span>
                  <div className="flex-1">{val(appData.nameBangla, '.......................................................................................')}</div>
                </div>
                <div className="flex items-baseline pl-48">
                  <span className="text-gray-700 mr-2 shrink-0">In English (Capital letters):</span>
                  <div className="flex-1 font-mono uppercase font-bold">
                    {val(appData.nameEnglish || appData.fullName, '...........................................................................')}
                  </div>
                </div>
              </div>

              {/* 2. Applicant's Father's Name */}
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="font-bold w-48 shrink-0">2. Applicant's Father's Name: *</span>
                  <span className="text-gray-700 mr-2 shrink-0">In Bangla:</span>
                  <div className="flex-1">{val(appData.fatherNameBangla, '.......................................................................................')}</div>
                </div>
                <div className="flex items-baseline pl-48">
                  <span className="text-gray-700 mr-2 shrink-0">In English (Capital letters):</span>
                  <div className="flex-1 font-mono uppercase">
                    {val(appData.fatherNameEnglish, '...........................................................................')}
                  </div>
                </div>
              </div>

              {/* 3. Applicant's Mother's Name */}
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="font-bold w-48 shrink-0">3. Applicant's Mother's Name: *</span>
                  <span className="text-gray-700 mr-2 shrink-0">In Bangla:</span>
                  <div className="flex-1">{val(appData.motherNameBangla, '.......................................................................................')}</div>
                </div>
                <div className="flex items-baseline pl-48">
                  <span className="text-gray-700 mr-2 shrink-0">In English (Capital letters):</span>
                  <div className="flex-1 font-mono uppercase">
                    {val(appData.motherNameEnglish, '...........................................................................')}
                  </div>
                </div>
              </div>
            </div>

            {/* Clear the photo float margin for items 4 onwards */}
            <div className="mt-3 space-y-2.5 text-[11.5px] text-black">
              {/* 4. Gender */}
              <div className="flex items-center gap-6">
                <span className="font-bold w-48 shrink-0">4. Gender:</span>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <span className={`inline-block w-3.5 h-3.5 border border-black text-center text-[10px] leading-3 font-bold ${isCheck('Male', appData.gender) ? 'bg-black text-white' : ''}`}>
                      {isCheck('Male', appData.gender) ? '✓' : ''}
                    </span>
                    <span>Male</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <span className={`inline-block w-3.5 h-3.5 border border-black text-center text-[10px] leading-3 font-bold ${isCheck('Female', appData.gender) ? 'bg-black text-white' : ''}`}>
                      {isCheck('Female', appData.gender) ? '✓' : ''}
                    </span>
                    <span>Female</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <span className={`inline-block w-3.5 h-3.5 border border-black text-center text-[10px] leading-3 font-bold ${isCheck('Others', appData.gender) ? 'bg-black text-white' : ''}`}>
                      {isCheck('Others', appData.gender) ? '✓' : ''}
                    </span>
                    <span>Others</span>
                  </label>
                </div>
              </div>

              {/* 5. Class */}
              <div className="flex items-center gap-4">
                <span className="font-bold w-48 shrink-0">5. Class:</span>
                <div className="flex items-center gap-4 flex-wrap">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <span className={`inline-block w-3.5 h-3.5 border border-black text-center text-[10px] leading-3 font-bold ${isCheck('11th', appData.studentClass) ? 'bg-black text-white' : ''}`}>
                      {isCheck('11th', appData.studentClass) ? '✓' : ''}
                    </span>
                    <span>11th</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <span className={`inline-block w-3.5 h-3.5 border border-black text-center text-[10px] leading-3 font-bold ${isCheck('12th', appData.studentClass) ? 'bg-black text-white' : ''}`}>
                      {isCheck('12th', appData.studentClass) ? '✓' : ''}
                    </span>
                    <span>12th</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <span className={`inline-block w-3.5 h-3.5 border border-black text-center text-[10px] leading-3 font-bold ${isCheck('Honours 1st year', appData.studentClass) ? 'bg-black text-white' : ''}`}>
                      {isCheck('Honours 1st year', appData.studentClass) ? '✓' : ''}
                    </span>
                    <span>Honours 1st year</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <span className={`inline-block w-3.5 h-3.5 border border-black text-center text-[10px] leading-3 font-bold ${isCheck('Honours 2nd year', appData.studentClass) ? 'bg-black text-white' : ''}`}>
                      {isCheck('Honours 2nd year', appData.studentClass) ? '✓' : ''}
                    </span>
                    <span>Honours 2nd year</span>
                  </label>
                </div>
              </div>

              {/* 6. Department/Subject */}
              <div className="flex items-baseline">
                <span className="font-bold w-48 shrink-0">6. Department/Subject:</span>
                <div className="flex-1">{val(appData.department, '...........................................................................................................................')}</div>
              </div>

              {/* 7 & 8: Roll No & Academic Session */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-baseline">
                  <span className="font-bold w-24 shrink-0">7. Roll No:</span>
                  <div className="flex-1 font-mono">{val(appData.collegeRoll, '................................................')}</div>
                </div>
                <div className="flex items-baseline">
                  <span className="font-bold w-36 shrink-0">8. Academic Session:</span>
                  <div className="flex-1 font-mono">{val(appData.session, '................................................')}</div>
                </div>
              </div>

              {/* 9 & 10: Date of Birth & Religion */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-baseline">
                  <span className="font-bold w-28 shrink-0">9. Date of Birth:</span>
                  <div className="flex-1">{val(appData.dateOfBirth, '................................................')}</div>
                </div>
                <div className="flex items-baseline">
                  <span className="font-bold w-24 shrink-0">10. Religion:</span>
                  <div className="flex-1">{val(appData.religion, '................................................')}</div>
                </div>
              </div>

              {/* 11. Present Address */}
              <div className="space-y-1 pt-0.5">
                <div className="font-bold">11. Present Address:</div>
                <div className="grid grid-cols-4 gap-2 pl-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">Village/Area:</span>
                    <span className="flex-1 truncate">{val(appData.presentAddress?.village, '..........................')}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">Post:</span>
                    <span className="flex-1 truncate">{val(appData.presentAddress?.post, '..........................')}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">Upazila:</span>
                    <span className="flex-1 truncate">{val(appData.presentAddress?.upazila, '..........................')}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">District:</span>
                    <span className="flex-1 truncate">{val(appData.presentAddress?.district, '..........................')}</span>
                  </div>
                </div>
              </div>

              {/* 12. Permanent Address */}
              <div className="space-y-1 pt-0.5">
                <div className="font-bold">12. Permanent Address:</div>
                <div className="grid grid-cols-4 gap-2 pl-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">Village/Area:</span>
                    <span className="flex-1 truncate">{val(appData.permanentAddress?.village, '..........................')}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">Post:</span>
                    <span className="flex-1 truncate">{val(appData.permanentAddress?.post, '..........................')}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">Upazila:</span>
                    <span className="flex-1 truncate">{val(appData.permanentAddress?.upazila, '..........................')}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">District:</span>
                    <span className="flex-1 truncate">{val(appData.permanentAddress?.district, '..........................')}</span>
                  </div>
                </div>
              </div>

              {/* 13. Contact */}
              <div className="space-y-1 pt-0.5">
                <div className="font-bold">13. Contact:</div>
                <div className="grid grid-cols-3 gap-2 pl-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">Mobile (Self):*</span>
                    <span className="flex-1 font-mono font-bold truncate">{val(appData.phoneSelf || appData.phone, '.......................')}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">Mobile (Guardian):</span>
                    <span className="flex-1 font-mono truncate">{val(appData.phoneGuardian, '.......................')}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-700 shrink-0">Email (if any):</span>
                    <span className="flex-1 font-mono text-[10px] truncate">{val(appData.email, '.......................')}</span>
                  </div>
                </div>
              </div>

              {/* 14. Educational Qualifications (Bordered Table) */}
              <div className="space-y-1 pt-1">
                <div className="font-bold">14. Educational Qualifications:*</div>
                <table className="w-full border-collapse border border-black text-center text-[10.5px]">
                  <thead>
                    <tr className="bg-gray-100 font-bold border-b border-black">
                      <th className="border border-black p-1">Exam Name</th>
                      <th className="border border-black p-1">Division / Group</th>
                      <th className="border border-black p-1">Passing Year</th>
                      <th className="border border-black p-1">GPA Obtained</th>
                      <th className="border border-black p-1">Board</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1: SSC */}
                    <tr className="h-7 border-b border-black">
                      <td className="border border-black font-bold p-1">SSC</td>
                      <td className="border border-black p-1">
                        {!isBlank && appData.qualifications?.[0]?.divisionOrGroup ? appData.qualifications[0].divisionOrGroup : ''}
                      </td>
                      <td className="border border-black p-1 font-mono">
                        {!isBlank && appData.qualifications?.[0]?.passingYear ? appData.qualifications[0].passingYear : ''}
                      </td>
                      <td className="border border-black p-1 font-mono font-bold">
                        {!isBlank && appData.qualifications?.[0]?.gpa ? appData.qualifications[0].gpa : ''}
                      </td>
                      <td className="border border-black p-1">
                        {!isBlank && appData.qualifications?.[0]?.board ? appData.qualifications[0].board : ''}
                      </td>
                    </tr>
                    {/* Row 2: HSC */}
                    <tr className="h-7">
                      <td className="border border-black p-1">
                        <span className="font-bold">HSC</span>{' '}
                        <span className="text-[9px] text-gray-600 block">(Only for Honours Student)</span>
                      </td>
                      <td className="border border-black p-1">
                        {!isBlank && appData.qualifications?.[1]?.divisionOrGroup ? appData.qualifications[1].divisionOrGroup : ''}
                      </td>
                      <td className="border border-black p-1 font-mono">
                        {!isBlank && appData.qualifications?.[1]?.passingYear ? appData.qualifications[1].passingYear : ''}
                      </td>
                      <td className="border border-black p-1 font-mono font-bold">
                        {!isBlank && appData.qualifications?.[1]?.gpa ? appData.qualifications[1].gpa : ''}
                      </td>
                      <td className="border border-black p-1">
                        {!isBlank && appData.qualifications?.[1]?.board ? appData.qualifications[1].board : ''}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 15, 16, 17: Height, Blood Group, Weight */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="flex items-baseline">
                  <span className="font-bold w-18 shrink-0">15. Height:</span>
                  <div className="flex-1 font-bold">
                    {val(
                      appData.heightFeet ? `${appData.heightFeet}' ${appData.heightInches || '0'}"` : appData.height,
                      '..............................'
                    )}
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="font-bold w-26 shrink-0">16. Blood Group:</span>
                  <div className="flex-1 font-black text-[#8b0000]">
                    {val(appData.bloodGroup, '..............................')}
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="font-bold w-18 shrink-0">17. Weight:</span>
                  <div className="flex-1 font-bold">
                    {val(appData.weightKg ? `${appData.weightKg} kg` : appData.weight, '..............................')}
                  </div>
                </div>
              </div>

              {/* 18. Chest Measurement */}
              <div className="flex items-baseline gap-6">
                <span className="font-bold shrink-0">18. Chest Measurement:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-700">Normal:</span>
                  <span className="font-bold">{val(appData.chestNormal, '..............................')}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-700">Expanded:</span>
                  <span className="font-bold">{val(appData.chestExpanded, '..............................')}</span>
                </div>
              </div>

              {/* 19. Additional Skills */}
              <div className="flex items-baseline">
                <span className="font-bold w-36 shrink-0">19. Additional Skills:</span>
                <div className="flex-1">{val(appData.additionalSkills || appData.reason, '...........................................................................................................................')}</div>
              </div>
            </div>
          </div>

          {/* Page 1 Bottom Marker */}
          <div className="pt-4 border-t border-gray-300 flex items-center justify-between text-[9px] text-gray-500 font-mono">
            <span>Official BNCC Recruitment Enrolment Document</span>
            <span>Page 1 of 2</span>
          </div>
        </div>

        {/* =========================================================================
            PAGE 2: PLEDGE, GUARDIAN CONSENT & SIGNATORIES
            ========================================================================= */}
        <div
          className="bg-white p-8 sm:p-10 my-4 shadow-2xl rounded-sm border border-[#d8d2be] print:border-none print:shadow-none print:m-0 print:p-[12mm] print:rounded-none min-h-[297mm] flex flex-col justify-between"
          style={{
            pageBreakBefore: 'always',
            breakBefore: 'page',
            boxSizing: 'border-box',
          }}
        >
          <div className="space-y-6">
            {/* Top Mini Header */}
            <div className="text-center border-b border-black/40 pb-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-black">
                Bangladesh National Cadet Corps (BNCC) • New Govt. Degree College, Rajshahi
              </span>
            </div>

            {/* SECTION 20: PLEDGE */}
            <div className="space-y-4">
              <h2 className="text-center text-sm font-black uppercase tracking-widest text-black underline">
                Pledge
              </h2>

              <p className="text-[12px] leading-relaxed text-justify text-black">
                <span className="font-bold">20. </span>
                I, <span className="font-bold underline px-1">{isBlank ? '...................................................................................' : (appData.nameEnglish || appData.fullName || '...................................................')}</span>,
                promise that I shall be bound to perform any service activity in the national interest by order of BNCC. Even at the risk of my life for the defense of the country, I will obey the lawful orders of my superior officers and cadets. From the date of my enlistment in the BNCC, I will be bound to appear for any of the above-mentioned duties whenever called upon by the BNCC as long as my cadetship remains active.
              </p>

              {/* Applicant Signature Lines */}
              <div className="flex items-end justify-between pt-10 px-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-medium">
                    Date: <span className="font-mono">{isBlank ? '....................................' : (appData.appliedAt?.split(' ')[0] || new Date().toLocaleDateString('en-GB'))}</span>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <div className="border-t border-black w-56 pt-1 font-bold text-xs">
                    Applicant's Signature
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-black/20 my-2" />

            {/* SECTION 21: GUARDIAN'S CONSENT LETTER */}
            <div className="space-y-4">
              <h2 className="text-center text-sm font-black uppercase tracking-widest text-black underline">
                Guardian's Consent Letter
              </h2>

              <p className="text-[12px] leading-relaxed text-justify text-black">
                <span className="font-bold">21. </span>
                This is to certify that my child, <span className="font-bold underline px-1">{isBlank ? '...................................................................................' : (appData.nameEnglish || appData.fullName || '...................................................')}</span>,
                is a 1st-year student in Class 11 / Bachelor's Degree program at New Govt. Degree College, Rajshahi. He/She wishes to become a member of the Bangladesh National Cadet Corps (BNCC) unit of the said college. I hereby grant permission for my son/child to become a member of the Bangladesh National Cadet Corps.
              </p>

              {/* Guardian Signature Lines */}
              <div className="flex items-end justify-between pt-10 px-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-medium">
                    Date: <span className="font-mono">....................................</span>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <div className="border-t border-black w-56 pt-1 font-bold text-xs">
                    Guardian's Signature
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-black my-4" />

            {/* 3-COLUMN OFFICIAL SIGNATORIES */}
            <div className="pt-2">
              <div className="grid grid-cols-3 gap-3 text-center text-[11px] leading-snug">
                {/* Column 1: Signature of Form Provider */}
                <div className="flex flex-col justify-end items-center h-40 pb-1">
                  <div className="border-t border-black w-full pt-1.5 font-bold text-black">
                    {sig.formProviderTitle || 'Signature of Form Provider:'}
                  </div>
                  <div className="text-[10px] text-gray-700 mt-1">
                    Date: ....................................
                  </div>
                </div>

                {/* Column 2: Countersigned (Platoon Commander) */}
                <div className="flex flex-col justify-end items-center h-40 pb-1 border-x border-gray-200 px-2">
                  <div className="border-t border-black w-full pt-1.5 text-black">
                    <span className="font-black block uppercase text-[11px] mb-0.5">Countersigned:</span>
                    <span className="font-bold block text-xs">{sig.countersignedName || 'PUO Md. Abdul Matin'}</span>
                    <span className="block font-mono text-[10.5px]">{sig.countersignedPNo || 'P-8193'}</span>
                    <span className="block text-[10.5px]">{sig.countersignedBattalion || '31 BNCC Battalion'}</span>
                    <span className="block text-[10.5px]">{sig.countersignedRegiment || 'Mahasthan Regiment'}</span>
                    <span className="font-semibold block text-[10.5px]">{sig.countersignedTitle || 'Platoon Commander'}</span>
                    <span className="block text-[10px] text-gray-700">{sig.countersignedInstitution || 'New Govt. Degree College, Rajshahi'}</span>
                  </div>
                </div>

                {/* Column 3: Signature of Platoon Senior Cadet */}
                <div className="flex flex-col justify-end items-center h-40 pb-1">
                  <div className="border-t border-black w-full pt-1.5 text-black">
                    <span className="font-black block uppercase text-[10.5px] mb-0.5 leading-tight">
                      Signature of Platoon Senior Cadet:
                    </span>
                    <span className="font-bold block text-xs mt-1">{sig.seniorCadetRankAndName || 'Cadet Sergeant Touhid'}</span>
                    {sig.seniorCadetNo ? <span className="block font-mono text-[10.5px]">{sig.seniorCadetNo}</span> : null}
                    <span className="block text-[10.5px]">{sig.seniorCadetBattalion || '31 BNCC Battalion'}</span>
                    <span className="block text-[10.5px]">{sig.seniorCadetRegiment || 'Mahasthan Regiment'}</span>
                    <span className="block text-[10px] text-gray-700">{sig.seniorCadetInstitution || 'New Govt. Degree College, Rajshahi'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ATTACHMENTS NOTICE BOX */}
            <div className="mt-6 border-2 border-dashed border-black/70 p-3.5 bg-gray-50/80 rounded-sm">
              <span className="font-black text-xs uppercase tracking-wide block text-black mb-1">
                Attachments: Must attach the below documents with the form.
              </span>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-black font-medium pl-1">
                {sig.attachments && sig.attachments.length > 0 ? (
                  sig.attachments.map((att, i) => <li key={i}>{att}</li>)
                ) : (
                  <>
                    <li>Photocopy of College ID Card / Admission Receipt</li>
                    <li>Photocopy of SSC / HSC Marksheet</li>
                    <li>Blood Group Certificate (if available)</li>
                  </>
                )}
              </ol>
            </div>
          </div>

          {/* Page 2 Bottom Marker */}
          <div className="pt-4 border-t border-gray-300 flex items-center justify-between text-[9px] text-gray-500 font-mono">
            <span>Bangladesh National Cadet Corps • NGDC Platoon</span>
            <span>Page 2 of 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
