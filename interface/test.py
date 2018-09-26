#!/usr/bin/env python

from faker import Faker
import datetime


os_list = ['ios', 'android', 'pc']
base_date = datetime.datetime.strptime('20180922', '%Y%m%d')


def test():
    fake = Faker()
    fp = open('tt', 'w')
    for i in xrange(300):
        for x in os_list:
            tmp_date = base_date - datetime.timedelta(days=i)
            tmp_num = fake.random_int(100, 300)
            tmp_list = [tmp_date.strftime('%Y%m%d'), x, tmp_num]
            tmp_list = [str(j) for j in tmp_list]
            tmp_str = ','.join(tmp_list) + '\n'
            fp.write(tmp_str)
    fp.close()


def main():
    test()


if __name__ == '__main__':
    main()
