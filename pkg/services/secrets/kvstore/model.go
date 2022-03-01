package kvstore

import (
	"time"
)

// Item stored in k/v store.
type Item struct {
	Id    int64
	OrgId *int64
	Type  *string
	Key   *string
	Value string

	Created time.Time
	Updated time.Time
}

func (i *Item) TableName() string {
	return "secrets"
}

type Key struct {
	OrgId int64
	Type  string
	Key   string
}

func (i *Key) TableName() string {
	return "secrets"
}
