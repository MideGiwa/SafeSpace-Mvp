import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { bookingService, type Booking } from '../../services/bookingService';
import { useAuthStore } from '../../stores/useAuthStore';
import { toast } from 'sonner';
import styles from './UpcomingSessions.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const UpcomingSessions: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isProfessional = user?.role === 'PROFESSIONAL';
  const [viewMode, setViewMode] = React.useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const { data: bookings, isLoading, error, refetch } = useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: bookingService.getBookings,
    retry: 1,
  });

  const nextSession = bookings?.find((b: Booking) => b.status === 'ACCEPTED' || b.status === 'PENDING');
  const laterSessions = bookings?.filter((b: Booking) => b.id !== nextSession?.id) || [];

  const handleAction = async (id: string, action: 'accept' | 'decline' | 'complete') => {
    try {
      if (action === 'accept') await bookingService.acceptBooking(id);
      else if (action === 'decline') await bookingService.declineBooking(id);
      else if (action === 'complete') await bookingService.completeBooking(id);
      
      toast.success(`Booking ${action}ed successfully`);
      refetch();
    } catch (err: any) {
      toast.error(`Failed to ${action} booking`);
    }
  };

  const completedBookings = bookings?.filter((b: Booking) => b.status === 'COMPLETED') || [];
  const completedCount = completedBookings.length;
  const totalMins = completedBookings.reduce((acc: number, b: Booking) => acc + (b.durationMins || 0), 0);
  const totalHours = Math.round(totalMins / 60);

  const getBookingsForDate = (date: Date) => {
    return bookings?.filter((b: Booking) => {
      const bDate = new Date(b.proposedAt);
      return bDate.toDateString() === date.toDateString();
    }) || [];
  };

  const bookingsOnSelectedDate = getBookingsForDate(selectedDate);

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.mainCanvas}>
          <div className={styles.errorState}>
            <span className="material-symbols-outlined">error</span>
            <h3>Failed to load appointments</h3>
            <p>Please try again later or contact support if the problem persists.</p>
            <button onClick={() => refetch()} className={styles.btnJoin}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Top Header */}
      <header className={styles.header}>
        <h2 className={styles.pageTitle}>Appointments</h2>
        <div className={styles.headerRight}>
          <div className={styles.searchWrap}>
            <span className="material-symbols-outlined">search</span>
            <input className={styles.searchInput} placeholder="Search bookings..." type="text" />
          </div>
          <button className={styles.iconBtn}><span className="material-symbols-outlined">notifications</span></button>
          <div className={styles.divider}></div>
          <button className={styles.iconBtn} onClick={() => navigate('/profile')} title="My Profile">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      <main className={styles.mainCanvas}>
        {/* Welcome Section */}
        <section className={styles.welcomeSection}>
          <div>
            <span className={styles.welcomeDate}>Today's Schedule</span>
            <h1 className={styles.welcomeTitle}>Upcoming Sessions</h1>
            {isLoading ? (
              <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '300px' }}></div>
            ) : (
              <p className={styles.welcomeDesc}>
                {bookings?.length ? (
                  <>You have {bookings.length} total bookings scheduled. Your next appointment is highlighted.</>
                ) : (
                  <>You have no appointments scheduled.</>
                )}
              </p>
            )}
          </div>
          <div className={styles.viewToggles}>
            <div className={styles.toggleInner}>
              <button 
                className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleActive : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
              <button 
                className={`${styles.toggleBtn} ${viewMode === 'calendar' ? styles.toggleActive : ''}`}
                onClick={() => setViewMode('calendar')}
              >
                Calendar
              </button>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {/* Main Column */}
          <div className={styles.mainCol}>
            {viewMode === 'list' ? (
              <>
                {/* Loading State or Next Session */}
                {isLoading ? (
                  <div className={`${styles.skeleton} ${styles.skeletonHero}`}></div>
                ) : nextSession ? (
                  <div className={styles.heroCard} style={{ borderLeft: nextSession.status === 'PENDING' ? '4px solid #f59e0b' : '4px solid var(--primary)' }}>
                    <div className={styles.heroDeco}></div>
                    <div className={styles.heroContent}>
                      <div className={styles.clientInfo}>
                        <div className={styles.clientImgWrap}>
                          <img src={isProfessional ? nextSession.clientAvatar : nextSession.professionalAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${nextSession.id}`} alt="User" />
                          <div className={styles.onlineDot}></div>
                        </div>
                        <div>
                          <div className={styles.clientNameRow}>
                            <h3 className={styles.clientName}>{isProfessional ? nextSession.clientName || 'Anonymous Client' : nextSession.professionalName || 'SafeSpace Specialist'}</h3>
                            <span className={styles.tagRecurring} style={{ background: nextSession.status === 'PENDING' ? '#fef3c7' : undefined, color: nextSession.status === 'PENDING' ? '#92400e' : undefined }}>{nextSession.status}</span>
                          </div>
                          <p className={styles.clientType}>
                            <span className="material-symbols-outlined">psychology</span>
                            Mental Health Consultation • {nextSession.durationMins || 50} min
                          </p>
                          <div className={styles.clientMeta}>
                            <div className={styles.metaTime}>
                              <span className="material-symbols-outlined">schedule</span> {new Date(nextSession.proposedAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                            <div className={styles.metaVideo}>
                              <span className="material-symbols-outlined">videocam</span> 
                              Video Consultation
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.heroActions}>
                        {nextSession.status === 'ACCEPTED' ? (
                          <button className={styles.btnStart} onClick={() => navigate('/call')}>
                            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_circle</span>
                            Start Session
                          </button>
                        ) : isProfessional && nextSession.status === 'PENDING' ? (
                          <>
                            <button className={styles.btnStart} onClick={() => handleAction(nextSession.id, 'accept')}>Accept</button>
                            <button className={styles.btnNotes} onClick={() => handleAction(nextSession.id, 'decline')}>Decline</button>
                          </>
                        ) : (
                          <button className={styles.btnNotes} onClick={() => navigate('/profile')}>Waiting for partner</button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : !bookings?.length && (
                  <div className={styles.emptyState}>
                    <p>No upcoming sessions found.</p>
                    <button className={styles.btnJoin} onClick={() => navigate('/directory')}>Browse Professionals</button>
                  </div>
                )}

                {/* Later List */}
                <div className={styles.laterListContainer}>
                  <h4 className={styles.laterHeader}>All Bookings</h4>
                  {isLoading ? (
                    <div className={`${styles.skeleton} ${styles.skeletonRow}`}></div>
                  ) : (
                    laterSessions.map((booking: Booking) => (
                      <div key={booking.id} className={styles.sessionRow} onClick={() => navigate('/call')}>
                        <div className={styles.rowLeft}>
                          <img className={styles.rowImg} src={isProfessional ? booking.clientAvatar : booking.professionalAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.id}`} alt="Partner" />
                          <div>
                            <h5 className={styles.rowName}>{isProfessional ? booking.clientName || 'Client' : booking.professionalName || 'Specialist'}</h5>
                            <p className={styles.rowDesc}>{new Date(booking.proposedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {booking.status}</p>
                          </div>
                        </div>
                        <div className={styles.rowRight}>
                          {isProfessional && booking.status === 'PENDING' && (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                               <button className={styles.btnJoin} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={(e) => { e.stopPropagation(); handleAction(booking.id, 'accept'); }}>Accept</button>
                               <button className={styles.btnNotes} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderColor: '#ef4444', color: '#ef4444' }} onClick={(e) => { e.stopPropagation(); handleAction(booking.id, 'decline'); }}>Decline</button>
                            </div>
                          )}
                          {booking.status === 'ACCEPTED' && <button className={styles.btnJoin}>Join Call</button>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className={styles.calendarView}>
                <Calendar 
                  onChange={(val) => setSelectedDate(val as Date)} 
                  value={selectedDate}
                  tileClassName={({ date }) => getBookingsForDate(date).length > 0 ? styles.hasBooking : null}
                />
                
                <div className={styles.selectedDateDetails}>
                  <h4 className={styles.dateTitle}>{selectedDate.toDateString() === new Date().toDateString() ? "Today's" : selectedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} appointments</h4>
                  {bookingsOnSelectedDate.length > 0 ? (
                    bookingsOnSelectedDate.map(booking => (
                      <div key={booking.id} className={styles.sessionRow} onClick={() => navigate('/call')}>
                        <div className={styles.rowLeft}>
                          <img className={styles.rowImg} src={isProfessional ? booking.clientAvatar : booking.professionalAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.id}`} alt="Partner" />
                          <div>
                            <h5 className={styles.rowName}>{isProfessional ? booking.clientName || 'Client' : booking.professionalName || 'Specialist'}</h5>
                            <p className={styles.rowDesc}>{new Date(booking.proposedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {booking.status}</p>
                          </div>
                        </div>
                        <div className={styles.rowRight}>
                          <button className={styles.btnJoin}>Details</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.emptyCalendarState}>
                      No appointments scheduled for this date.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Side Column */}
          <div className={styles.sideCol}>
            {/* Insights Card */}
            <div className={styles.analyticsCard}>
              <div className={styles.analyticsDeco}>
                <span className="material-symbols-outlined">clinical_notes</span>
              </div>
              <h4 className={styles.acTitle}>Weekly Insights</h4>
              <div className={styles.acBody}>
                <div className={styles.acMainStat}>
                  <p className={styles.acBigNum}>{completedCount}</p>
                  <p className={styles.acNumLabel}>Sessions completed</p>
                </div>
                <div className={styles.acGrid}>
                  <div className={styles.acBox}>
                    <p className={styles.acBoxVal}>{completedCount > 0 ? '100%' : '0%'}</p>
                    <p className={styles.acBoxLabel}>Satisfaction</p>
                  </div>
                  <div className={styles.acBox}>
                    <p className={styles.acBoxVal}>{totalHours}h</p>
                    <p className={styles.acBoxLabel}>Total Help</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.focusAreas} style={{ marginTop: '1.5rem' }}>
              <h4 className={styles.focusTitle}>Focus Areas</h4>
              <div className={styles.focusChips}>
                <span className={styles.chipTertiary}>Anxiety</span>
                <span className={styles.chipPrimary}>Depression</span>
                <span className={styles.chipTertiary}>Trauma</span>
                <span className={styles.chipPrimary}>Relationships</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* FAB */}
      <button className={styles.fab} onClick={() => navigate('/inbox')}>
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>add_comment</span>
      </button>
    </div>
  );
};
