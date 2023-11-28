import toast from 'react-hot-toast';

export const notifyInfo = () =>
  toast.error(
    'Sorry, there are no images matching your search query. Please try again.'
  );

export const notifyInputQuerry = () =>
  toast.error('Sorry, please provide a search word');

export const success = query => {
  toast.success(
    <div>
      Your request: <b>{query}</b> is found!
    </div>,
    {
      duration: 4000,
    }
  );
};
