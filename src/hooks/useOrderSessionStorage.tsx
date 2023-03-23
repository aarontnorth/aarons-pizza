import {useSessionStorage} from 'usehooks-ts';

const useOrderSessionStorage = () => {

  const [currentTable, setCurrentTable] =
    useSessionStorage<number>('table_no', 1);

  const incrementTable = () => {
      setCurrentTable(currentTable+1);
  };

  return { currentTable, incrementTable };
};

export default useOrderSessionStorage;
