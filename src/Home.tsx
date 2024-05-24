import { useEffect, useState } from 'react';
import './Home.css';
import downArrow from './assets/downArrow.svg';
import AddTaskDialog from './components/AddTaskDialog';

const Home = () => {
    const [isCompletedExpanded, setIsCompletedExpanded] = useState<boolean>(false);
    const [isInProgressExpanded, setIsInProgressExpanded] = useState<boolean>(false);
    const [isNotStartedExpanded, setIsNotStartedExpanded] = useState<boolean>(false);
    const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState<boolean>(false);
    const [tasks, setTasks] = useState<any>([]);
    const [isNewTask, setIsNewTask] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [id, setId] = useState<any>('');

    // const tasks = [
    //     { id: 1, title: 'Task 1', status: 'completed' },
    //     { id: 2, title: 'Task 2', status: 'completed' },
    //     { id: 3, title: 'Task 3', status: 'completed' },
    //     { id: 4, title: 'Task 4', status: 'inProgress' },
    //     { id: 5, title: 'Task 5', status: 'inProgress' },
    //     { id: 6, title: 'Task 6', status: 'inProgress' },
    //     { id: 7, title: 'Task 7', status: 'notStarted' },
    //     { id: 8, title: 'Task 8', status: 'notStarted' },
    //     { id: 9, title: 'Task 9', status: 'notStarted' }
    // ];

    useEffect(()=>{
        const fetchTasks = async () => {
            const response = await fetch('https://prm-api.onrender.com/get');
            const data = await response.json();
            setTasks(data);
            console.log(data);
        };
        fetchTasks();
    },[isAddTaskDialogOpen]);

    const handleExpand = (type: string) => {
        switch (type) {
            case 'completed':
                setIsCompletedExpanded(!isCompletedExpanded);
                setIsInProgressExpanded(false);
                setIsNotStartedExpanded(false);
                break;
            case 'inProgress':
                setIsInProgressExpanded(!isInProgressExpanded);
                setIsCompletedExpanded(false);
                setIsNotStartedExpanded(false);
                break;
            case 'notStarted':
                setIsNotStartedExpanded(!isNotStartedExpanded);
                setIsCompletedExpanded(false);
                setIsInProgressExpanded(false);
                break;
            default:
                break;
        }
    };

    const handleAddTask = () => {
        setTitle('');
        setStatus('');
        setIsNewTask(true);
        setIsAddTaskDialogOpen(true);
    };

    const handleEditTask = (taskId: any) => {
        setIsNewTask(false);
        const task = tasks.find((task: any) => task.id === taskId);
        if (task) {
            setTitle(task.name);
            setStatus(task.status);
            setIsNewTask(false);
            setId(taskId);
            setIsAddTaskDialogOpen(true);
        }
    };

    return (
        <>
        <div className='mainContainer'>
            <div className='heading'>Project Management Dashboard</div>
            <div className='subHeading'>Track the progress of your projects at a glance.</div>
            <button className='addTaskBtn' onClick={()=>{handleAddTask()}}>Add Task</button>
            
            <div className='taskHeading' onClick={() => handleExpand('completed')}>
                Completed
                <img src={downArrow} alt="arrow" width={24} style={{ transform: isCompletedExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            <div className={`taskContainer ${isCompletedExpanded ? 'expanded' : ''}`}>
                {tasks.filter((task:any) => task.status === 'completed').map((task: any) => (
                    <div className='taskConatiner1' onClick={()=>{handleEditTask(task.id)}}>
                    <div key={task.id} className='task'>{task.name}</div>
                    <div className='taskCompleted'>Completed</div>
                    </div>
                ))}
            </div>
            <div className='bottomBorder'></div>
            
            <div className='taskHeading' onClick={() => handleExpand('inProgress')}>
                In Progress
                <img src={downArrow} alt="arrow" width={24} style={{ transform: isInProgressExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            <div className={`taskContainer ${isInProgressExpanded ? 'expanded' : ''}`}>
                {tasks.filter((task:any) => task.status === 'inProgress').map((task:any) => (
                    <div className='taskConatiner1' onClick={()=>{handleEditTask(task.id)}}>
                    <div key={task.id} className='task'>{task.name}</div>
                    <div className='taskInprogress'>In Progress</div>
                    </div>
                ))}
            </div>
            <div className='bottomBorder'></div>
            
            <div className='taskHeading' onClick={() => handleExpand('notStarted')}>
                Not Started
                <img src={downArrow} alt="arrow" width={24} style={{ transform: isNotStartedExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            <div className={`taskContainer ${isNotStartedExpanded ? 'expanded' : ''}`}>
                {tasks.filter((task:any) => task.status === 'notStarted').map((task:any) => (
                    <div className='taskConatiner1' onClick={()=>{handleEditTask(task.id)}}>
                    <div key={task.id} className='task'>{task.name}</div>
                    <div className='taskNotStarted'>Not Started</div>
                    </div>
                ))}
            </div>
            <div className='bottomBorder'></div>
        </div>
        {isAddTaskDialogOpen && (
    <>
        <div className='dialogBackground' onClick={() => setIsAddTaskDialogOpen(false)}></div>
        <AddTaskDialog onClose={() => setIsAddTaskDialogOpen(false)} isNewTask={isNewTask} title={title} setTitle={setTitle} status={status} setStatus={setStatus} id={id} />
    </>
)}
        </>
    );
};

export default Home;
