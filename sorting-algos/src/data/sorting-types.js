import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MergeIcon from '@mui/icons-material/Merge';
import InputIcon from '@mui/icons-material/Input';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import BoltIcon from '@mui/icons-material/Bolt';
import { MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const sortingTypes = [
    {
        id: 1,
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
        sortingType: 'BUBBLE_SORT',
        name: 'Bubble Sort',
        icon: <BubbleChartIcon className='mr-1'/>
    },
    {
        id: 2,
        timeComplexity: 'O(n*log n)',
        spaceComplexity: 'O(n)',
        sortingType: 'MERGE_SORT',
        name: 'Merge Sort',
        icon: <MergeIcon className='mr-1'/>
    },
    {
        id: 3,
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
        sortingType: 'INSERTION_SORT',
        name: 'Insertion Sort',
        icon: <InputIcon className='mr-1'/>
    },
    {
        id: 4,
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
        sortingType: 'SELECTION_SORT',
        name: 'Selection Sort',
        icon: <SwapHorizIcon className='mr-1'/>
    },
    {
        id: 5,
        timeComplexity: 'O(n*log n)',
        spaceComplexity: 'O(1)',
        sortingType: 'SHELL_SORT',
        name: 'Shell Sort',
        icon: <BakeryDiningIcon className='mr-1'/>
    },
    {
        id: 6,
        timeComplexity: 'O(n*log n)',
        spaceComplexity: 'O(1)',
        sortingType: 'HEAP_SORT',
        name: 'Heap Sort',
        icon: <MDBIcon icon="code-branch" className='ml-2 mr-2'/>
    },
    {
        id: 7,
        timeComplexity: 'O(n*log n)',
        spaceComplexity: 'O(log n)',
        sortingType: 'QUICK_SORT',
        name: 'Quick Sort',
        icon: <BoltIcon className='mr-1'/>
    },
]

export default sortingTypes;