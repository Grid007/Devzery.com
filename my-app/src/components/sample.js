import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  background-color: #001f3f;
  color: #fff;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
`;



const MiniContainer = styled.div`
   margin-top: 100px;
  background-color: #001f3f;
  color: #fff;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
`

const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #002b55;
  border-radius: 20px;
  padding: 10px;
  width: 300px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #002b55;
  border-radius: 20px;
  padding: 10px;
  width: 300px;
`;

const SearchInput = styled.input`
  background-color: transparent;
  color: #fff;
  border: none;
  padding: 10px;
  font-size: 16px;
  flex: 1;
  border-radius: 20px 0 0 20px;
`;

const SearchIcon = styled.div`
  background-color: #FF69B4;
  color: #fff;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;


const WhiteLine = styled.div`
  margin-top: 110px;
  width: 100%;
  height: 2px;
  background-color: #455d7a;
  position: absolute;
  top: -10px;
`;

const TableContainer = styled.div`
  background-color: #002b55;
  border-radius: 10px;
  padding: 20px;
  width: 800px;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TableHeaderItem = styled.div`
  font-weight: bold;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #001f3f;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
`;

const TableData = styled.div`
  text-align: left;
`;

const StatusDropdown = styled.div`
  display: flex;
  align-items: center;
  background-color: #002b55;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  position: relative;
`;

const StatusDropdownLabel = styled.div`
  color: #fff;
  margin-right: 10px;
`;

const StatusDropdownOptions = styled.div`
  position: absolute;
  top: 40px;
  background-color: #002b55;
  border-radius: 10px;
  padding: 10px;
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 1;
`;

const StatusDropdownOption = styled.div`
  color: #fff;
  cursor: pointer;
  padding: 5px;
  margin-bottom: 5px;
`;

const PassButton = styled.div`
  background-color: #800080;
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  display: ${props => props.show ? 'block' : 'none'};
`;

const FailButton = styled.div`
  background-color: #f50057;
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  display: ${props => props.show ? 'block' : 'none'};
`;

const Sample = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusDropdownVisible, setStatusDropdownVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusDropdownClick = (index) => {
    setStatusDropdownVisible(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleStatusOptionClick = (index, status) => {
    setSelectedStatus(prevState => ({
      ...prevState,
      [index]: status
    }));
    setStatusDropdownVisible(prevState => ({
      ...prevState,
      [index]: false
    }));
  };

  return (
    <div>

    <Container>
    <WhiteLine />
    <MiniContainer>
      <SearchBarContainer>
        <SearchBarWrapper>
          <SearchBar>
            <SearchInput type="text" placeholder="Search issue..." value={searchQuery} onChange={handleSearchChange} />
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
          </SearchBar>
        </SearchBarWrapper>
      </SearchBarContainer>
      <TableContainer>
        <TableHeader>
          <TableHeaderItem>Test Case Name</TableHeaderItem>
          <TableHeaderItem>Estimate Time (In Minutes)</TableHeaderItem>
          <TableHeaderItem>Module</TableHeaderItem>
          <TableHeaderItem>Priority</TableHeaderItem>
          <TableHeaderItem>Status</TableHeaderItem>
        </TableHeader>
        {[0, 1, 2].map((index) => (
          <TableRow key={index}>
            <TableData>Test Case ID</TableData>
            <TableData>5 Minutes</TableData>
            <TableData>{index === 0 ? 'Onboarding' : index === 1 ? 'User Log In' : 'Password'}</TableData>
            <TableData>{index === 0 ? 'Low' : index === 1 ? 'Medium' : 'High'}</TableData>
            <TableData>
              <StatusDropdown onClick={() => handleStatusDropdownClick(index)}>
                <StatusDropdownLabel>{selectedStatus[index] || 'Select'}</StatusDropdownLabel>
                <FontAwesomeIcon icon={faAngleDown} />
              </StatusDropdown>
              <StatusDropdownOptions show={statusDropdownVisible[index]}>
                <StatusDropdownOption onClick={() => handleStatusOptionClick(index, 'PASS')}>PASS</StatusDropdownOption>
                <StatusDropdownOption onClick={() => handleStatusOptionClick(index, 'FAIL')}>FAIL</StatusDropdownOption>
              </StatusDropdownOptions>
              <PassButton show={selectedStatus[index] === 'PASS'}>PASS</PassButton>
              <FailButton show={selectedStatus[index] === 'FAIL'}>FAIL</FailButton>
            </TableData>
          </TableRow>
        ))}
      </TableContainer>
      </MiniContainer>
    </Container>
</div>
  );
};

export default Sample;