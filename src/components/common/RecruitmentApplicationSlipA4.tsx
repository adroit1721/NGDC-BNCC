import React, { useRef } from 'react';
import { Download, Printer, X, Shield, CheckCircle2, User, Phone, Mail, Calendar, FileText } from 'lucide-react';
import { RecruitmentApplicant, RecruitmentAnnouncementConfig, FormFieldConfig } from '../../types';

interface RecruitmentApplicationSlipA4Props {
  applicant: RecruitmentApplicant;
  announcement?: RecruitmentAnnouncementConfig;
  formFields?: FormFieldConfig[];
  onClose?: () => void;
}

export const RecruitmentApplicationSlipA4: React.FC<RecruitmentApplicationSlipA4Props> = ({
  applicant,
  announcement,
  formFields = [],
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      {/* Print Controls Bar - Hidden when printing */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-60 flex items-center gap-2 print:hidden bg-[#1c1c18]/90 text-white p-2 rounded-2xl shadow-xl backdrop-blur-md border border-white/10">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#eedc82] hover:bg-[#ffe885] text-[#1c1c18] font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as A4 PDF</span>
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-[#cdc6b3] hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* A4 Container */}
      <div
        ref={printRef}
        id="recruitment-a4-slip"
        className="w-full max-w-[210mm] min-h-[297mm] bg-white text-[#1c1c18] p-8 sm:p-10 my-4 rounded-xl shadow-2xl print:shadow-none print:m-0 print:p-[12mm] print:w-[210mm] print:min-h-[297mm] print:max-w-none flex flex-col justify-between border border-[#e5e0d3] print:border-none font-sans text-xs relative"
        style={{
          boxSizing: 'border-box',
        }}
      >
        {/* Custom Header Banner OR Default Official BNCC Header */}
        <div>
          {announcement?.headerImageUrl ? (
            <div className="mb-4 border-b-2 border-[#1c1c18] pb-3">
              <img
                src={announcement.headerImageUrl}
                alt="Recruitment Header"
                referrerPolicy="no-referrer"
                className="w-full max-h-28 object-contain mx-auto"
              />
            </div>
          ) : (
            <div className="text-center border-b-2 border-[#1c1c18] pb-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-full bg-[#eedc82]/30 border border-[#6b5e10] flex items-center justify-center shrink-0">
                  <Shield className="w-8 h-8 text-[#6b5e10]" />
                </div>
                <div className="text-center flex-1 px-4">
                  <h1 className="text-lg font-black tracking-wider uppercase text-[#1c1c18]">
                    Bangladesh National Cadet Corps
                  </h1>
                  <h2 className="text-sm font-bold text-[#6b5e10]">
                    New Government Degree College Platoon (Army Wing)
                  </h2>
                  <p className="text-[10px] text-gray-600 font-medium">
                    Mohishbathan, Rajshahi - 6000 | 2 Bn, Mohasthan Regiment
                  </p>
                  <p className="text-[11px] font-black uppercase tracking-widest text-[#8b0000] mt-1 underline">
                    Official Cadet Enlistment Application Slip (A4)
                  </p>
                </div>
                {/* Photo Box or Avatar */}
                <div className="w-20 h-24 border-2 border-dashed border-[#1c1c18] rounded-md flex items-center justify-center shrink-0 overflow-hidden bg-gray-50 text-center">
                  {applicant.avatarUrl ? (
                    <img
                      src={applicant.avatarUrl}
                      alt={applicant.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="p-1">
                      <User className="w-6 h-6 mx-auto text-gray-400" />
                      <span className="text-[8px] text-gray-500 font-medium block">Applicant Photograph</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Token & Status Banner */}
          <div className="bg-[#f7f5ed] border border-[#d8d2be] rounded-lg p-2.5 mb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Application Tracking Token</span>
              <span className="text-base font-mono font-black tracking-wider text-[#1c1c18]">
                {applicant.token}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Recruitment Batch</span>
              <span className="text-xs font-bold text-[#6b5e10]">
                {announcement?.batch || 'Batch 24'} ({applicant.session || '2024-2025'})
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Submission Status</span>
              <span className="inline-flex items-center gap-1 font-bold text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3 h-3" />
                {applicant.status || 'Pending'}
              </span>
            </div>
          </div>

          {/* Section 1: Candidate Personal Particulars */}
          <div className="mb-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#1c1c18] bg-[#eedc82]/40 px-2.5 py-1 rounded mb-2 border-l-4 border-[#6b5e10]">
              1. Candidate Academic & Personal Particulars
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
              <div className="border-b border-gray-200 pb-1 flex justify-between">
                <span className="text-gray-600 font-medium">Full Legal Name:</span>
                <span className="font-bold text-[#1c1c18]">{applicant.fullName}</span>
              </div>
              <div className="border-b border-gray-200 pb-1 flex justify-between">
                <span className="text-gray-600 font-medium">College Roll / ID:</span>
                <span className="font-mono font-bold text-[#1c1c18]">{applicant.collegeRoll}</span>
              </div>
              <div className="border-b border-gray-200 pb-1 flex justify-between">
                <span className="text-gray-600 font-medium">Class / Department:</span>
                <span className="font-semibold text-[#1c1c18]">{applicant.department}</span>
              </div>
              <div className="border-b border-gray-200 pb-1 flex justify-between">
                <span className="text-gray-600 font-medium">Academic Session:</span>
                <span className="font-semibold text-[#1c1c18]">{applicant.session}</span>
              </div>
              <div className="border-b border-gray-200 pb-1 flex justify-between">
                <span className="text-gray-600 font-medium">Contact Phone:</span>
                <span className="font-mono font-bold text-[#1c1c18]">{applicant.phone}</span>
              </div>
              <div className="border-b border-gray-200 pb-1 flex justify-between">
                <span className="text-gray-600 font-medium">Email Address:</span>
                <span className="font-mono text-[#1c1c18]">{applicant.email || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Physical Measurements & Medical Standard */}
          <div className="mb-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#1c1c18] bg-[#eedc82]/40 px-2.5 py-1 rounded mb-2 border-l-4 border-[#6b5e10]">
              2. Physical & Medical Measurements
            </h3>
            <div className="grid grid-cols-3 gap-3 text-[11px]">
              <div className="bg-gray-50 p-2 rounded border border-gray-200 text-center">
                <span className="text-[10px] text-gray-500 block font-medium">Height</span>
                <span className="font-black text-sm text-[#1c1c18]">
                  {applicant.heightFeet ? `${applicant.heightFeet}' ${applicant.heightInches || 0}"` : applicant.height || 'N/A'}
                </span>
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-200 text-center">
                <span className="text-[10px] text-gray-500 block font-medium">Weight</span>
                <span className="font-black text-sm text-[#1c1c18]">
                  {applicant.weightKg ? `${applicant.weightKg} kg` : applicant.weight || 'N/A'}
                </span>
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-200 text-center">
                <span className="text-[10px] text-gray-500 block font-medium">Blood Group</span>
                <span className="font-black text-sm text-[#8b0000]">
                  {applicant.bloodGroup}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Motivation & Custom Form Answers */}
          <div className="mb-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#1c1c18] bg-[#eedc82]/40 px-2.5 py-1 rounded mb-2 border-l-4 border-[#6b5e10]">
              3. Applicant Motivation & Custom Questionnaire
            </h3>
            <div className="bg-gray-50 p-2.5 rounded border border-gray-200 text-[11px] mb-2">
              <span className="font-semibold text-gray-700 block mb-0.5">Motivation for Joining BNCC:</span>
              <p className="text-gray-800 italic leading-relaxed">
                "{applicant.reason || 'Desire to serve the nation with honor and discipline.'}"
              </p>
            </div>

            {/* Any dynamic custom fields */}
            {applicant.customData && Object.keys(applicant.customData).length > 0 && (
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {Object.entries(applicant.customData).map(([key, val]) => (
                  <div key={key} className="bg-gray-50 p-2 rounded border border-gray-200">
                    <span className="font-medium text-gray-600 text-[10px] block">{key}:</span>
                    <span className="font-semibold text-gray-900">{String(val || 'N/A')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Instructions for Physical & Viva Test */}
          <div className="mb-4 bg-amber-50/70 border border-amber-200 p-2.5 rounded text-[10px] leading-relaxed text-amber-950">
            <span className="font-bold block text-amber-900 uppercase tracking-wide mb-0.5">
              Important Instructions for the Applicant:
            </span>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Bring this printed A4 slip along with 02 passport-size photographs and College ID card on test day.</li>
              <li>Report venue: {announcement?.venue || 'College Gymnasium & Main Parade Ground, NGDC'}.</li>
              <li>Physical fitness assessment includes 1-mile endurance run, push-ups, and drill coordination.</li>
              <li>Dress code: White polo shirt / PT dress with athletic shoes.</li>
            </ul>
          </div>
        </div>

        {/* Footer Section: Custom Footer Banner or Official Signatures */}
        <div className="pt-2">
          {announcement?.footerImageUrl ? (
            <div className="mb-3 border-t border-gray-200 pt-2">
              <img
                src={announcement.footerImageUrl}
                alt="Recruitment Footer"
                referrerPolicy="no-referrer"
                className="w-full max-h-16 object-contain mx-auto"
              />
            </div>
          ) : null}

          {announcement?.footerText && (
            <p className="text-center text-[10px] text-gray-500 mb-4 italic">
              {announcement.footerText}
            </p>
          )}

          {/* Signature Boxes */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-300 text-center text-[10px]">
            <div>
              <div className="border-t border-dashed border-gray-400 pt-1 mt-4">
                <span className="font-bold text-gray-800 block">{applicant.fullName}</span>
                <span className="text-gray-500">Applicant Signature</span>
              </div>
            </div>
            <div>
              <div className="border-t border-dashed border-gray-400 pt-1 mt-4">
                <span className="font-bold text-gray-800 block">Cadet Under Officer</span>
                <span className="text-gray-500">Recruitment In-charge</span>
              </div>
            </div>
            <div>
              <div className="border-t border-dashed border-gray-400 pt-1 mt-4">
                <span className="font-bold text-gray-800 block">Professor Under Officer (PUO)</span>
                <span className="text-gray-500">Platoon Commander, NGDC</span>
              </div>
            </div>
          </div>

          <div className="text-center text-[9px] text-gray-400 mt-4 border-t border-gray-100 pt-1 flex items-center justify-between">
            <span>Generated on {applicant.appliedAt || new Date().toLocaleString()}</span>
            <span>Official BNCC Recruitment Document | Page 1 of 1 (Standard A4 Format)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
