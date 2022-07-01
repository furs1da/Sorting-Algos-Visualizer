import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MergeIcon from '@mui/icons-material/Merge';
import InputIcon from '@mui/icons-material/Input';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const sortingTypes = [
    {
        id: 1,
        sortingType: 'BUBBLE_SORT',
        name: 'Bubble Sort',
        icon: <BubbleChartIcon/>
    },
    {
        id: 2,
        sortingType: 'MERGE_SORT',
        name: 'Merge Sort',
        icon: <MergeIcon/>
    },
    {
        id: 3,
        sortingType: 'INSERTION_SORT',
        name: 'Insertion Sort',
        icon: <InputIcon/>
    },
    {
        id: 4,
        sortingType: 'SELECTION_SORT',
        name: 'Selection Sort',
        icon: <SwapHorizIcon/>
    },
]

export default sortingTypes;