'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/common/Navbar';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, FileText, User, Clock } from 'lucide-react';

export default function PatientHistoryRecords() {
  const { token, API_BASE_URL } = useAuth();
  const { id } = useParams();
  const router = useRouter();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/patients/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Patient not found');

        const data = await res.json();
        setPatient(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id && token) fetchPatient();
  }, [id, token]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-8">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        {loading && (
          <div className="text-center py-20 text-slate-400 animate-pulse text-sm">
            Loading patient records...
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm">
            Error: {error}
          </div>
        )}

        {patient && (
          <div className="space-y-6">
            {/* Patient Header */}
            <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-500/10 rounded-xl">
                  <User className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                    {patient.name}
                  </h1>
                  <p className="text-sm text-slate-400 font-medium mt-1">
                    {patient.age} years old · {patient.gender} · {patient.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-teal-600" />
                Clinical Medical History
              </h2>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-6">
                  {patient.medicalHistory || 'No medical history recorded for this patient.'}
                </p>
              </div>
            </div>

            {/* Appointments History */}
            <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-teal-600" />
                Appointment Records
              </h2>

              {patient.appointments && patient.appointments.length > 0 ? (
                <div className="space-y-3">
                  {patient.appointments.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-500/5 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {new Date(app.appointmentDate).toLocaleDateString()} at{' '}
                          {new Date(app.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {app.reason || 'No reason provided'}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-extrabold uppercase tracking-wide ${
                        app.status === 'COMPLETED' ? 'bg-teal-500/10 text-teal-600' :
                        app.status === 'CANCELLED' ? 'bg-rose-500/10 text-rose-500' :
                        'bg-amber-500/10 text-amber-500'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-6">
                  No appointment records found for this patient.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}