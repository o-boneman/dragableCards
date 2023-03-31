document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    const placeholder = document.createElement('div');

    placeholder.style.border = '2px dashed gray';
    placeholder.style.borderRadius = '4px';
    placeholder.style.margin = '0 10px';
    placeholder.style.visibility = 'hidden';

    let draggedCard = null;

    for (const card of cards) {
        card.addEventListener('dragstart', function (event) {
            draggedCard = event.target;
            event.dataTransfer.setData('text/plain', null);

            placeholder.style.height = `${draggedCard.offsetHeight}px`;
            placeholder.style.width = `${draggedCard.offsetWidth}px`;
            placeholder.style.visibility = 'visible';

            setTimeout(() => {
                event.target.style.display = 'none';
                draggedCard.parentNode.insertBefore(placeholder, draggedCard);
            }, 0);
        });

        card.addEventListener('dragend', function (event) {
            event.target.style.display = 'block';
            placeholder.style.visibility = 'hidden';
            if (placeholder.parentNode) {
                placeholder.parentNode.removeChild(placeholder);
            }
        });

        card.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        card.addEventListener('dragenter', function (event) {
            event.preventDefault();

            if (draggedCard !== event.currentTarget) {
                const cardsArray = Array.from(document.querySelectorAll('.card'));
                const draggedIndex = cardsArray.indexOf(draggedCard);
                const targetIndex = cardsArray.indexOf(event.currentTarget);

                if (draggedIndex < targetIndex) {
                    const nextSibling = event.currentTarget.nextSibling;

                    if (nextSibling && nextSibling !== draggedCard) {
                        this.parentNode.insertBefore(draggedCard, nextSibling);
                        this.parentNode.insertBefore(placeholder, nextSibling);
                    } else {
                        this.parentNode.appendChild(draggedCard);
                        this.parentNode.appendChild(placeholder);
                    }
                } else {
                    if (event.currentTarget !== draggedCard.previousSibling) {
                        this.parentNode.insertBefore(draggedCard, event.currentTarget);
                        this.parentNode.insertBefore(placeholder, event.currentTarget);
                    }
                }
            }
        });
    }
});
