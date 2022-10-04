import Block from '../../utils/Block'

import './user-popup.css'

export class UserPopup extends Block {
    static componentName = 'UserPopup'

    protected render(): string {
        return `
            <ul class="user__menu">
                <li>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
                        <line x1="10.9999" y1="5.5" x2="10.9999" y2="16.5" stroke="#3369F3" stroke-width="1.5"/>
                        <line x1="5.49988" y1="11" x2="16.4999" y2="11" stroke="#3369F3" stroke-width="1.5"/>
                    </svg>
                    <span> Добавить пользователя </span>
                </li>
                <li>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
                        <line x1="7.11077" y1="7.11103" x2="14.8889" y2="14.8892" stroke="#3369F3" stroke-width="1.5"/>
                        <line x1="7.11078" y1="14.8891" x2="14.889" y2="7.11093" stroke="#3369F3" stroke-width="1.5"/>
                    </svg>
                    <span> Удалить пользователя </span>
                </li>
                <li>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0022 0C4.93515 0 0 4.87082 0 10.8545C0 13.1872 0.741573 15.4086 2.13799 17.2833C2.0686 17.8054 1.92982 18.2977 1.71299 18.7556C1.39208 19.4319 0.984427 19.8642 0.689533 20.1809C0.359945 20.5319 0.0216834 20.8914 0.203824 21.3623C0.390302 21.8331 1.04514 22 1.87345 22C2.68441 22 3.66883 21.8416 4.54918 21.649C5.32111 21.4821 6.08437 21.251 6.80859 20.9599C6.83461 20.9514 6.8563 20.9385 6.87798 20.9214C8.18766 21.4436 9.57106 21.7132 10.9978 21.7132C13.769 21.7132 16.4187 20.6903 18.4526 18.837C18.6477 18.6615 18.6564 18.3619 18.4786 18.1735C18.3008 17.9809 17.9972 17.9724 17.8064 18.1479C15.946 19.8428 13.5261 20.7759 10.9978 20.7759C9.61443 20.7759 8.27873 20.5062 7.02109 19.9669C6.83028 19.8856 6.61778 19.937 6.48334 20.0782C6.47033 20.0825 6.46166 20.0825 6.44865 20.0868C5.77213 20.3564 5.06091 20.5747 4.34102 20.7288C2.9316 21.0327 1.68263 21.1097 1.2056 21.0113C1.25764 20.9514 1.32269 20.8829 1.3834 20.8187C1.70432 20.4763 2.18569 19.9626 2.57165 19.1537C2.85787 18.5502 3.04002 17.8953 3.10507 17.2019C3.11808 17.0564 3.06604 16.9237 2.97063 16.8296C2.96196 16.8167 2.95328 16.7996 2.94461 16.7868C1.64794 15.0661 0.95407 13.016 0.95407 10.8545C0.95407 5.38872 5.46422 0.941634 11.0022 0.941634C16.5401 0.941634 21.0503 5.38872 21.0503 10.8545C21.0503 12.7078 20.5299 14.514 19.5454 16.0805C19.4067 16.3031 19.476 16.5899 19.6972 16.7268C19.9227 16.8638 20.2133 16.7953 20.3521 16.577C21.4319 14.8607 22 12.8833 22 10.8545C22.0043 4.87082 17.0692 0 11.0022 0Z" fill="#3369F3"/>
                        <path d="M6.43965 11C6.19584 11 6 11.2227 6 11.5C6 11.7773 6.19584 12 6.43965 12H15.5604C15.8042 12 16 11.7773 16 11.5C16 11.2227 15.8042 11 15.5604 11H6.43965Z" fill="#3369F3"/>
                    </svg>
                    <span> Удалить чат </span>
                </li>
            </ul>
        `
    }
}
