import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  background-color: #0a163a;
  color: white;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterButton= styled.button`
  background-color:#38598b;
  color: #fff;
  padding: 10px;
  border: none;
  margin-right: 65%;
`

const Header = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  position: relative;
`;

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
  background-color: #38598b;
  border-radius: 20px 6px 6px 20px;
  padding: 5px 40px 5px 40px;
  width: 300px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #38598b;
  border-radius: 20px;
  padding:  5px 5px 5px 40px;
  width: 300px;
`;

const SearchInput = styled.input`
  background-color: transparent;
  color: #fff;
  border: none;
  padding: 10px 90px 10px 10px;
  font-size: 16px;
  flex: 1;
  border-radius: 20px;
  margin-right: 60px;
  margin-left:-50px;
`;

const SearchIcon = styled.div`
  background-color: #ff69b4;
  color: #fff;
  padding: 20px 25px 10px 25px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #455d7a;
  margin: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  max-width: 1200px;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.thead`
  background-color: #38598b;
  font-size: 20px;
  th {
    padding: 45px;
    text-align: left;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #1b294f;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #1b294f;
`;

const StatusButton = styled.select`
  background-color: #1b294f;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const PassFailButton = styled.button`
  background-color: ${(props) => (props.pass ? '#32cd32' : '#ff3399')};
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

const StyledTextarea = styled.textarea`
  background-color: #1b294f;
  color: #fff;
  border: none;
  padding: 20px;
  height: 100px;
  width: 90%;
  margin-top: 10px;
  border-radius: 5px;
`;

const TestCaseUI = () => {
  const [testCases, setTestCases] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/testcases');
      setTestCases(response.data);
      setStatuses(response.data.map(() => 'Select'));
    } catch (error) {
      console.error('Error fetching test cases:', error);
    }
  };

  const handleStatusChange = (index, status) => {
    const newStatuses = [...statuses];
    newStatuses[index] = status;
    setStatuses(newStatuses);
  };

  const handleDescriptionChange = (id, description) => {
    const updatedTestCases = testCases.map((testCase) =>
      testCase.id === id ? { ...testCase, description } : testCase
    );
    setTestCases(updatedTestCases);

    // Update the test case in the backend
    updateTestCase(id, description);
  };

  const updateTestCase = async (id, description) => {
    try {
      await axios.put(`http://127.0.0.1:5000/testcases/${id}`, { description });
    } catch (error) {
      console.error('Error updating test case:', error);
    }
  };

  return (
    <Container>
      <Line />
      <SearchBarContainer>
        <SearchBarWrapper>
          <SearchBar>
            <SearchInput type="text" placeholder="Search issue..." />
          </SearchBar>
        </SearchBarWrapper>
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} style={{fontSize:'150%'}} />
            </SearchIcon>
      </SearchBarContainer>
      <FilterButton>Filter <FontAwesomeIcon icon={faFilter} style={{marginLeft:'10px'}} /></FilterButton>
      <Table>
        <TableHeader>
          <tr>
            <th>Test Case Name</th>
            <th>Estimate Time<br/><br/><span style={{fontSize:'65%'}}>(In Minutes)</span></th>
            <th>Module</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </TableHeader>
        <tbody>
          {testCases.map((testCase, index) => (
            <TableRow key={testCase.id}>
              <TableCell>
                <div>Test Case ID {testCase.id}</div>
                <StyledTextarea
                  value={testCase.description}
                  onChange={(e) =>
                    handleDescriptionChange(testCase.id, e.target.value)
                  }
                />
              </TableCell>
              <TableCell>5 Minutes</TableCell>
              <TableCell>{['Onboarding', 'User Log In', 'Password'][index]}</TableCell>
              <TableCell>{['Low', 'Medium', 'High'][index]}</TableCell>
              <TableCell>
                <StatusButton
                  value={statuses[index]}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Select">Select</option>
                  <option value="Pass" style={{backgroundColor:'#a393eb'}}>PASS</option>
                  <option value="Fail" style={{backgroundColor:'#a393eb'}}>FAIL</option>
                </StatusButton>
                {statuses[index] !== 'Select' && (
                  <PassFailButton pass={statuses[index] === 'Pass'}>
                    {statuses[index]}
                  </PassFailButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TestCaseUI;
