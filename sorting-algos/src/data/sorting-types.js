import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MergeIcon from '@mui/icons-material/Merge';
import InputIcon from '@mui/icons-material/Input';

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
]

export default sortingTypes;