import React from "react";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";

const LeftBar = () => {
  const { newUserList, newUserListLoading } = useSelector((state) => state.app);

  return (
    <div
      style={{
        display: 'none',
        border: '1px solid var(--border-dark)',
        padding: '16px',
        borderRadius: '8px',
        minHeight: 'fit-content',
        width: '20rem',
        position: 'sticky',
        top: '3rem',
      }}
      className="md:block"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '11rem' }}>
        {newUserListLoading ? (
          <p style={{ margin: 'auto', marginTop: '2.5rem', marginBottom: '2.5rem', color: 'white' }}>Loading...</p>
        ) : (
          newUserList.slice(0, 2).map((user) => (
            <ProfileCard key={user._id} user={user} isSmallWidth={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default LeftBar;
